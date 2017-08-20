import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { VenueType } from '../helpers/foursquare';
import { uploadFile } from '../helpers/files';
import { visitVenue } from '../helpers/firebase';

export default class Checkin extends Component {
  props: {
    isNear: boolean,
    errorMessage?: string,
    run: string,
    venue: VenueType,
  };

  _snapPicture = async () => {
    const { isNear, run, venue } = this.props;
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
        uploadFile({
          file: base64,
          venue: venue.id,
          run,
        });
        visitVenue({
          run,
          venue,
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
