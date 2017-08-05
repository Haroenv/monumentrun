// @flow

import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Run from '../components/Run';

export default class RunView extends Component {
  state = {
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
    return <Run run={this.state.run} />;
  }
}
