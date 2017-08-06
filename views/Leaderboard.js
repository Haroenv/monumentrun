// @flow

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { mapNavigationStateParamsToProps } from '../helpers/navigation';
import Leaderboard from '../components/Leaderboard';
import SingleRun from '../components/SingleRun';
import type { TabBar } from '../types';

class LeaderboardView extends Component {
  props: {
    navigation: { navigate: Function },
  };
  render() {
    const { navigate } = this.props.navigation;
    return <Leaderboard navigate={navigate} />;
  }
}

export default StackNavigator({
  Settings: {
    screen: LeaderboardView,
    path: '/',
    navigationOptions: {
      title: 'Leaderboard',
      tabBarLabel: 'Top',
      tabBarIcon: ({ tintColor, focused }: TabBar) =>
        <Ionicons
          name={focused ? 'ios-stopwatch' : 'ios-stopwatch-outline'}
          size={32}
          style={{ color: tintColor }}
        />,
    },
  },
  SingleRun: {
    screen: mapNavigationStateParamsToProps(SingleRun),
    path: '/run/:run',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}'s Run`,
      tabBarLabel: 'Top',
      tabBarIcon: ({ tintColor, focused }: TabBar) =>
        <Ionicons
          name={focused ? 'ios-stopwatch' : 'ios-stopwatch-outline'}
          size={32}
          style={{ color: tintColor }}
        />,
    }),
  },
});
