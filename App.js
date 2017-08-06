import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { mapNavigationStateParamsToProps } from './helpers/navigation';
import { Run, Leaderboard, Help, User } from './views';

const Tabs = TabNavigator(
  {
    run: { screen: mapNavigationStateParamsToProps(Run) },
    leaderboard: { screen: Leaderboard, path: '/leaderboard' },
    help: { screen: Help },
    user: { screen: User },
  },
  { tabBarPosition: 'bottom' }
);

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Tabs />
      </View>
    );
  }
}
