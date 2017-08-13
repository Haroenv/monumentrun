import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { getUser } from '../helpers/auth';
import LocationProvider from './LocationProvider';

const timer = StyleSheet.create({
  cursor: {
    backgroundColor: 'red',
  },
  container: {
    height: 5,
  },
});

const Timer = () =>
  <View style={timer.container}>
    <View style={[timer.cursor]} />
  </View>;

const notLoggedIn = StyleSheet.create({
  text: {
    textAlign: 'center',
    padding: 6,
    fontSize: 18,
  },
});

class NotLoggedIn extends Component {
  props: {
    navigate: string => void,
  };

  render() {
    const { navigate } = this.props;
    return (
      <View>
        <Text style={notLoggedIn.text}>
          You are not logged in, please log in before running
        </Text>
        <Button title="login" onPress={() => navigate('user')} />
      </View>
    );
  }
}

class Bar extends Component {
  props: {
    closest: {
      name: string,
      score: number,
      distance: number,
      category: string,
    },
    history: any[],
  };

  render() {
    const {
      closest: {
        name = 'Saint-Jacques Tower (Tour Saint-Jacques)',
        score = 16,
        distance = 50,
        category = 'Historic Site',
      } = {},
      history = [],
    } = this.props;
    return (
      <View>
        <Text>
          {score}p
        </Text>
        <Text>
          {name}
        </Text>
        <Text>
          {distance}m away
        </Text>
        <Text>
          {category}
        </Text>
        <Text>
          {history.length} monuments visited
        </Text>
        <Timer />
      </View>
    );
  }
}

export default class Bottom extends Component {
  state = {
    user: null,
  };

  props: {
    navigate: string => void,
  };

  componentDidMount() {
    try {
      getUser(user => this.setState({ user }));
    } catch (e) {
      // please log in 🙅
    }
  }

  render() {
    const { navigate } = this.props;
    const { user } = this.state;

    return (
      <LocationProvider
        render={props =>
          user === null
            ? <NotLoggedIn navigate={navigate} />
            : <Bar {...props} />}
      />
    );
  }
}
