// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Run from '../components/Run';
import BottomBar from '../components/BottomBar';
import type { TabBar } from '../types';

export default class RunView extends Component {
  static defaultProps = {
    run: '-KnZ1p-Vm6LzDoMnUj-t',
  };

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
    const { run } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <Run run={run} />
        <BottomBar navigate={navigate} />
      </View>
    );
  }
}
