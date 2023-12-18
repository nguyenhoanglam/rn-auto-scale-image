import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import PlaceholderImage from './PlaceholderImage';

import type { ReactElement } from 'react';
import type {
  ViewStyle,
  ImageStyle,
  StyleProp,
  ImageProps,
  ImageBackgroundProps,
  ImageSourcePropType,
} from 'react-native';

interface Size {
  width: number;
  height: number;
}

interface AutoScaleImageProps extends ImageBackgroundProps {
  style?: StyleProp<ImageStyle> | StyleProp<ViewStyle> | undefined;
  isBackground?: boolean;
  loadingComponent?: ReactElement | undefined;
  fallbackComponent?: ReactElement | undefined;
  activeOpacity?: number;
  onPress?: () => void;
  onSize?: (size: Size) => void;
}

export function getSourceURI(source: ImageProps['source']): string | undefined {
  if (typeof source === 'number') return undefined;

  return Array.isArray(source) ? source[0]?.uri : source.uri;
}

const AutoScaleImage: React.FC<AutoScaleImageProps> = ({
  source,
  width,
  height,
  style,
  isBackground,
  loadingComponent,
  fallbackComponent,
  activeOpacity,
  onPress,
  onSize,
  ...restProps
}) => {
  const mountedRef = useRef(false);
  const lastScaledSourceRef = useRef<ImageSourcePropType>();

  const [scaleSize, setScaleSize] = useState<Size | undefined>();

  const imageStyle = StyleSheet.flatten([
    style,
    scaleSize && { width: scaleSize.width, height: scaleSize.height },
  ]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const updateScaleSize = (w: number | undefined, h: number | undefined) => {
      if (mountedRef.current) {
        lastScaledSourceRef.current = source;

        if (w === undefined || h === undefined) {
          setScaleSize(undefined);
        } else {
          const size = { width: w, height: h };

          setScaleSize(size);
          onSize && onSize(size);
        }
      }
    };

    const calculateScaleSize = (srcWidth: number, srcHeight: number) => {
      if (width && height) {
        updateScaleSize(width, height);
        return;
      }

      let aspectRatio = 1;

      if (width) {
        aspectRatio = width / srcWidth;
      } else if (height) {
        aspectRatio = height / srcHeight;
      }

      updateScaleSize(srcWidth * aspectRatio, srcHeight * aspectRatio);
    };

    const fetchSourceImageSize = () => {
      if (typeof source === 'number') {
        const { width: w, height: h } = Image.resolveAssetSource(source);
        calculateScaleSize(w, h);
      } else {
        const uri = getSourceURI(source);

        if (uri) {
          Image.getSize(
            uri,
            (w, h) => calculateScaleSize(w, h),
            (error) => {
              updateScaleSize(undefined, undefined);
              console.error(error);
            }
          );
        } else {
          updateScaleSize(undefined, undefined);
          console.error('Image source URI is not defined.');
        }
      }
    };

    fetchSourceImageSize();
  }, [source, width, height, onSize]);

  const ImageComponent =
    loadingComponent || fallbackComponent
      ? PlaceholderImage
      : ((isBackground ? ImageBackground : Image) as React.ComponentType<any>);

  if (lastScaledSourceRef.current !== source) {
    return null;
  }

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
        <ImageComponent
          {...restProps}
          source={source}
          style={imageStyle}
          loadingComponent={loadingComponent}
          fallbackComponent={fallbackComponent}
        />
      </TouchableOpacity>
    );
  }

  return (
    <ImageComponent
      {...restProps}
      source={source}
      style={imageStyle}
      loadingComponent={loadingComponent}
      fallbackComponent={fallbackComponent}
    />
  );
};

export default AutoScaleImage;
