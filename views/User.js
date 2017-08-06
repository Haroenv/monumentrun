// @flow

import React, { Component } from 'react';
import { View, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loginWithFacebook } from '../helpers/auth';
export default class UserView extends Component {
  static navigationOptions = {
    tabBarLabel: 'User',
    title: 'test',
    tabBarIcon: ({ tintColor, focused }) =>
      <Ionicons
        name={focused ? 'ios-person' : 'ios-person-outline'}
        size={32}
        style={{ color: tintColor }}
      />,
  };
  props: {
    navigation: any,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button title="start running 😏" onPress={() => navigate('run')} />
        <Button
          onPress={() => loginWithFacebook()}
          title="log in with facebook"
        />
      </View>
    );
  }
}
