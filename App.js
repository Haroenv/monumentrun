import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import StatusBar from './components/StatusBar';

import { Run, Leaderboard, Help } from './views';

const Tabs = TabNavigator({
  run: { screen: Run },
  leaderboard: { screen: Leaderboard },
  help: { screen: Help },
  user: { screen: () => <View /> },
});

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
