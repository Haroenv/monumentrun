// @flow

import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ActiveRun from '../components/ActiveRun';
import type { TabBar } from '../types';

export default class RunView extends Component {
  props: {
    run: string,
    navigation: {
      navigate: string => void,
    },
  };

  static navigationOptions = {
    tabBarLabel: 'Run',
    tabBarIcon: ({ tintColor, focused }: TabBar) =>
      <Ionicons
        name={focused ? 'ios-flag' : 'ios-flag-outline'}
        size={32}
        style={{ color: tintColor }}
      />,
  };

  render() {
    return <ActiveRun navigate={this.props.navigation.navigate} />;
  }
}
