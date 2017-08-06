import React, { Component } from 'react';
import { Text } from 'react-native';
import LocationProvider from './LocationProvider';

export default class Bottom extends Component {
  render() {
    return (
      <LocationProvider
        render={props =>
          <Text>
            {JSON.stringify(props)}
          </Text>}
      />
    );
  }
}
