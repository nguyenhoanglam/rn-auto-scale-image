import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import type { ImageProps } from 'react-native';

interface Size {
  width: number;
  height: number;
}

interface AutoScaleImageProps extends ImageProps {
  isBackground?: boolean;
  activeOpacity?: number;
  onPress?: () => void;
  onSize?: (size: Size) => void;
}

function getSourceURI(source: ImageProps['source']): string | undefined {
  if (typeof source === 'number') return undefined;

  return Array.isArray(source) ? source[0]?.uri : source.uri;
}

const AutoScaleImage: React.FC<AutoScaleImageProps> = ({
  source,
  width,
  height,
  style,
  isBackground,
  activeOpacity,
  onPress,
  onSize,
  ...restProps
}) => {
  const mountedRef = useRef(false);

  const [scaleSize, setScaleSize] = useState<Size | undefined>();

  const imageStyle = StyleSheet.flatten([
    style,
    scaleSize && { width: scaleSize.width, height: scaleSize.height },
  ]);

  const imageKey = getSourceURI(source) || Date.now().toString();

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const updateScaleSize = (w: number | undefined, h: number | undefined) => {
      if (mountedRef.current) {
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

  const ImageComponent = (
    isBackground ? ImageBackground : Image
  ) as React.ComponentType<any>;

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
        <ImageComponent
          key={imageKey}
          source={source}
          style={imageStyle}
          {...restProps}
        />
      </TouchableOpacity>
    );
  }

  return (
    <ImageComponent
      key={imageKey}
      source={source}
      style={imageStyle}
      {...restProps}
    />
  );
};

export default AutoScaleImage;
