// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Run from '../components/Run';

export default class RunView extends Component {
  static defaultProps = {
    run: '-KnZ1p-Vm6LzDoMnUj-t',
  };

  static navigationOptions = {
    tabBarLabel: 'Run',
    tabBarIcon: ({ tintColor, focused }) =>
      <Ionicons
        name={focused ? 'ios-flag' : 'ios-flag-outline'}
        size={32}
        style={{ color: tintColor }}
      />,
  };

  render() {
    const { run } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Run run={run} />
        <View>
          <Text>Yo, I'm the bottom</Text>
        </View>
      </View>
    );
  }
}
