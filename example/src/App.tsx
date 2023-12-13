import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import AutoScaleImage from 'rn-auto-scale-image';

const URIS = [
  'https://cdn.pixabay.com/photo/2015/06/24/13/32/dog-820014_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/10/13/17/53/meerkat-3744754_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/08/01/20/42/wasp-8163788_1280.jpg',
  'https://cdn.pixabay.com/photo/2020/11/09/16/21/cat-5727135_1280.jpg',
  'https://cdn.pixabay.com/photo/2023/05/20/11/13/bird-8006343_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/07/27/22/55/sea-turtle-2547084_1280.jpg',
];

export default function App() {
  const [uriIndex, setUriIndex] = useState(0);

  const handlePreviousImage = () => {
    setUriIndex((uriIndex - 1 + URIS.length) % URIS.length);
  };

  const handleNextImage = () => {
    setUriIndex((uriIndex + 1) % URIS.length);
  };

  return (
    <View style={styles.container}>
      <AutoScaleImage
        source={{
          uri: URIS[uriIndex],
        }}
        width={Dimensions.get('screen').width}
        onSize={(size) => {
          console.log('Size: ', size);
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePreviousImage} style={styles.button}>
          <Text style={styles.change}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextImage} style={styles.button}>
          <Text style={styles.change}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 36,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  button: {
    minWidth: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  change: {
    fontSize: 20,
    color: 'white',
  },
});
