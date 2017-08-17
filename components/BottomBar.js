import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getUser } from '../helpers/auth';
import Checkin from './Checkin';

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

class Bar extends Component {
  props: {
    nearby: Array<{
      name: string,
      score: number,
      distance: number,
      category: string,
    }>,
    onStop: void => void,
  };

  render() {
    const { nearby: [first = {}] = [], onStop } = this.props;
    const { name, score, distance, category } = first;

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
        <Checkin isNear={distance < 200} />
        <Button title="stop" onPress={onStop} />
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

    return user === null
      ? <NotLoggedIn navigate={navigate} />
      : <Bar {...this.props} />;
  }
}
