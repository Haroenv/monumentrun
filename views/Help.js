import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class HelpView extends Component {
  static navigationOptions = {
    tabBarLabel: 'Help',
    tabBarIcon: ({ tintColor, focused }) =>
      <Ionicons
        name={focused ? 'ios-help-circle' : 'ios-help-circle-outline'}
        size={32}
        style={{ color: tintColor }}
      />,
  };

  render() {
    return (
      <View>
        <Text>ok hi</Text>
      </View>
    );
  }
}
