import React, { useState } from 'react';
import { View, Image, ImageBackground } from 'react-native';

import type { ReactElement } from 'react';
import type {
  ViewStyle,
  ImageStyle,
  ImageBackgroundProps,
  NativeSyntheticEvent,
  ImageErrorEventData,
  ImageLoadEventData,
} from 'react-native';

interface PlaceholderImageProps extends ImageBackgroundProps {
  style?: ImageStyle | ViewStyle | undefined;
  isBackground?: boolean;
  loadingComponent?: ReactElement | undefined;
  fallbackComponent?: ReactElement | undefined;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  style,
  isBackground,
  loadingComponent,
  fallbackComponent,
  ...restProps
}) => {
  const [status, setStatus] = useState({ loading: false, error: false });
  const { loading, error } = status;

  const placeholderStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: style?.width,
    height: style?.height,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const ImageComponent = (
    isBackground ? ImageBackground : Image
  ) as React.ComponentType<any>;

  return (
    <View>
      {loading || error ? (
        <View style={placeholderStyle}>
          {loading ? loadingComponent : fallbackComponent}
        </View>
      ) : null}

      <ImageComponent
        {...restProps}
        style={style}
        onLoadStart={() => {
          setStatus({ loading: true, error: false });
          restProps.onLoadStart?.();
        }}
        onLoad={(e: NativeSyntheticEvent<ImageLoadEventData>) => {
          setStatus({ loading: false, error: false });
          restProps.onLoad?.(e);
        }}
        onError={(e: NativeSyntheticEvent<ImageErrorEventData>) => {
          setStatus({ loading: false, error: true });
          restProps.onError?.(e);
        }}
      />
    </View>
  );
};

export default PlaceholderImage;
