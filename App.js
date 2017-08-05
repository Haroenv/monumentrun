import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';
import StatusBar from './components/StatusBar';

import { Run, Leaderboard, Help } from './views';

const mapNavigationStateParamsToProps = ScreenComponent => {
  return class extends Component {
    static navigationOptions = ScreenComponent.navigationOptions;
    render() {
      const { params } = this.props.navigation.state;
      return <ScreenComponent {...this.props} {...params} />;
    }
  };
};

const Tabs = TabNavigator({
  run: { screen: mapNavigationStateParamsToProps(Run) },
  leaderboard: { screen: Leaderboard },
  help: { screen: Help },
  user: {
    screen: ({ navigation }) =>
      <Button
        title="start running 😏"
        onPress={() => navigation.navigate('run')}
      />,
  },
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
