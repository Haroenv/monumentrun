import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const uploadImage = (uri: string) => console.warn('yolo', uri);

export default class Checkin extends Component {
  props: {
    isNear: boolean,
    errorMessage?: string,
  };

  _snapPicture = async () => {
    const { isNear = true } = this.props;
    if (!isNear) {
      alert("Get a bit closer, you're too far away now 🏃🏿");
    } else {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert("you can't take pictures without permission 🤔");
      }
      const { cancelled, uri } = await ImagePicker.launchCameraAsync();
      if (!cancelled) {
        uploadImage(uri);
      }
    }
  };

  render() {
    const { isNear = true } = this.props;
    const message = isNear ? 'Snap a picture' : 'Get closer';

    return (
      <View>
        <Ionicons
          name="ios-camera-outline"
          size={32}
          onPress={this._snapPicture}
          style={{ backgroundColor: 'red' }}
        />
        <Text>
          {message}
        </Text>
      </View>
    );
  }
}
