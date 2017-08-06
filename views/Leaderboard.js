import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mapNavigationStateParamsToProps } from '../helpers/navigation';
import Leaderboard from '../components/Leaderboard';

class LeaderboardView extends Component {
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

class SingleRun extends Component {
  render() {
    return JSON.stringify(this.props);
  }
}

export default StackNavigator({
  Settings: {
    screen: LeaderboardView,
    path: '/',
    navigationOptions: {
      title: 'Leaderboard',
    },
  },
  LeaderboardRun: {
    screen: mapNavigationStateParamsToProps(SingleRun),
    path: 'run',
    navigationOptions: {
      title: 'Notifications',
    },
  },
});
