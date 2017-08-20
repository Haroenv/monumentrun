import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { uploadFile } from '../helpers/files';

export default class Checkin extends Component {
  props: {
    isNear: boolean,
    errorMessage?: string,
  };

  _snapPicture = async () => {
    const { isNear } = this.props;
    if (!isNear) {
      alert("Get a bit closer, you're too far away now 🏃🏿");
    } else {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert("you can't take pictures without permission 🤔");
      }
      const { cancelled, base64 } = await ImagePicker.launchCameraAsync({
        base64: true,
      });
      if (!cancelled) {
        const run = '-KrzN1IaBayODr20nung';
        const venue = { id: '57206cc1498ea8f3570ce81c' };
        uploadFile({
          file: base64,
          venue,
          run,
        });
      }
    }
  };

  render() {
    const { isNear } = this.props;
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
