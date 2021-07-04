import React from 'react';
import RNTextDetector from 'react-native-text-detector';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({

  container: {
    padding: 5,
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    paddingTop: 80,
    paddingBottom: 60,
  },
});

const scanWhisky = () => {
  const detectText = async () => {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const { uri } = await this.camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(uri);
      console.log('visionResp', visionResp);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="outlined" onPress={() => detectText()}>Scan whisky</Button>
    </View>
  );
};

export default scanWhisky;
