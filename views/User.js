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
    navigate: string => void,
  };

  signOut = () => {
    signOut();
  };

  render() {
    const { user: { displayName }, navigate } = this.props;
    return (
      <View>
        <Button title="start running 😏" onPress={() => navigate('run')} />
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

  componentDidMount() {
    try {
      getUser(user => this.setState({ user }));
    } catch (e) {
      // please log in 🙅
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.state;
    return (
      <View>
        {user === null
          ? <Button
              onPress={() => loginWithFacebook()}
              title="log in with facebook"
            />
          : <SignedIn user={user} navigate={navigate} />}
      </View>
    );
  }
}

export default StackNavigator({
  User: {
    screen: UserView,
  },
});
