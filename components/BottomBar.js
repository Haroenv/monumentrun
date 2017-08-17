import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';

import { getUser } from '../helpers/auth';
import { TOTAL_TIME } from '../helpers/timing';
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

class FinishedRun extends Component {
  props: {
    navigate: string => void,
    run: string,
  };

  state = {
    name: undefined,
  };

  componentDidMount() {
    getUser(({ displayName: name }) => this.setState({ name }));
  }

  render() {
    const { navigate, run } = this.props;
    const { name } = this.state;
    return (
      <View>
        <Text>Good run!</Text>
        {name &&
          <Button
            title="see details"
            onPress={() => navigate('SingleRun', { run, name })}
          />}
      </View>
    );
  }
}

const timer = StyleSheet.create({
  cursor: {
    backgroundColor: 'red',
    height: 5,
  },
  container: {
    height: 5,
  },
});

const width = Dimensions.get('screen').width;

class Timer extends Component {
  props: {
    value: number,
    max: number,
  };
  render() {
    const { value, max } = this.props;
    return (
      <View style={timer.container}>
        <View style={[timer.cursor, { width: width * value / max }]} />
      </View>
    );
  }
}

class Bar extends Component {
  props: {
    nearby: Array<{
      name: string,
      score: number,
      distance: number,
      category: string,
    }>,
    onStop: void => void,
    secondsPassed: number,
    finished: boolean,
    navigate: string => void,
    name: string,
  };

  render() {
    const {
      nearby: [first = {}] = [],
      onStop,
      secondsPassed,
      finished,
      navigate,
      name: runner,
    } = this.props;
    const { name, score, distance, category } = first;
    if (finished) {
      return <FinishedRun navigate={navigate} name={runner} />;
    }
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
        <Text>
          {secondsPassed}
        </Text>
        <Timer value={secondsPassed} max={TOTAL_TIME + 2} />
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
