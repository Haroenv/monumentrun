import React, { Component } from 'react';
import { View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { mapNavigationStateParamsToProps } from './helpers/navigation';
import { Run, Leaderboard, Help, User } from './views';
import StatusBar from './components/StatusBar';

const Tabs = TabNavigator(
  {
    run: { screen: mapNavigationStateParamsToProps(Run) },
    leaderboard: { screen: Leaderboard, path: '/leaderboard' },
    help: { screen: Help },
    user: { screen: User },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#b1473f',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
      },
      indicatorStyle: {
        backgroundColor: '#b1473f',
      },
    },
  }
);

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <Tabs />
      </View>
    );
  }
}
