import React, { Component } from 'react';
import { View, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class UserView extends Component {
  static navigationOptions = {
    tabBarLabel: 'User',
    tabBarIcon: ({ tintColor, focused }) =>
      <Ionicons
        name={focused ? 'ios-person' : 'ios-person-outline'}
        size={32}
        style={{ color: tintColor }}
      />,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button title="start running 😏" onPress={() => navigate('run')} />
      </View>
    );
  }
}
