// @flow

import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';

import { loginWithFacebook, getUser, signOut } from '../helpers/auth';

class SignedIn extends Component {
  props: {
    user: {
      displayName: string,
    },
    onSignOut: void => void,
  };

  signOut() {
    const { onSignOut } = this.props;
    signOut();
    onSignOut();
  }

  render() {
    const { user: { displayName } } = this.props;
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>
          Welcome {displayName}
        </Text>
        <Button title="log out" onPress={this.signOut} />
      </View>
    );
  }
}

class UserView extends Component {
  static navigationOptions = {
    tabBarLabel: 'User',
    title: 'Settings',
    tabBarIcon: ({ tintColor, focused }) =>
      <Ionicons
        name={focused ? 'ios-person' : 'ios-person-outline'}
        size={32}
        style={{ color: tintColor }}
      />,
  };
  props: {
    navigation: { navigate: string => void },
  };
  state = {
    user: null,
  };

  async componentDidMount() {
    try {
      const user = await getUser();
      this.setState({ user });
    } catch (e) {
      // please log in 🙅
    }
  }

  onSignOut = () => this.setState({ user: null });

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.state;
    return (
      <View>
        <Button title="start running 😏" onPress={() => navigate('run')} />
        {user === null
          ? <Button
              onPress={() => loginWithFacebook()}
              title="log in with facebook"
            />
          : <SignedIn user={user} onSignOut={this.onSignOut} />}
      </View>
    );
  }
}

export default StackNavigator({
  User: {
    screen: UserView,
  },
});
