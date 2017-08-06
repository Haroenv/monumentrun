import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Leaderboard from '../components/Leaderboard';

export default class LeaderboardView extends Component {
  static navigationOptions = {
    tabBarLabel: 'Top',
    tabBarIcon: ({ tintColor, focused }) =>
      <Ionicons
        name={focused ? 'ios-stopwatch' : 'ios-stopwatch-outline'}
        size={32}
        style={{ color: tintColor }}
      />,
  };

  render() {
    const { navigate } = this.props.navigation;
    return <Leaderboard navigate={navigate} />;
  }
}
