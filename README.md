# rn-auto-scale-image

This component is based on React Native's `Image` but can scale its width or height automatically to keep the image's aspect ratio. It is useful when we don't know the aspect ratio in advance but want to display the entire image and limit it only by width or height.

## Installation

#### Using Yarn

```sh
yarn add rn-auto-scale-image
```

#### Using NPM

```sh
npm install rn-auto-scale-image
```

## Usage

Just specify `width` or `height` and the component will automatically calculate its other dimension.

```js
import AutoScaleImage from 'rn-auto-scale-image';

// ...

<AutoScaleImage
    source={{
        uri: 'https://reactnative.dev/img/logo-og.png',
    }}
    width={Dimensions.get('screen').width}
/>

```

> [!IMPORTANT]
> - If both `width` and `height` props are specified, the image will use these values as its dimensions (auto scale is disabled).
> - Don't specify `width` or `height` attributes in `style` props to avoid bugs.

## Props

#### `width?: number`

The component's width that is used to calculate its height.

----

#### `height?: number`

The component's height that is used to calculate its width.

----

#### `isBackground?: boolean`

Set to `true` to use the component as an `ImageBackground`.

----

#### `activeOpacity?: number`

The opacity of the component when touch is active. This prop will be ignored if `onPress` prop is `undefined`.

----

#### `onPress?: () => void`

The callback that invoked when the component is pressed.

----

#### `onSize?: (size: { width: number; height: number }) => void`

The callback that invoked when the component size is calculated.

----

#### All other props are the same as [`Image`](https://reactnative.dev/docs/image) props.

## Author

Copyright © 2023 Nguyen Hoang Lam

[![LinkedIn](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hoanglamvn90@gmail.com)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/hoanglamvn90)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lam-nguyen-hoang-70bb21115)