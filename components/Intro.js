import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { getUser } from '../helpers/auth';

function getRunner() {
  const runners = [
    '🏃',
    '🏃🏻',
    '🏃🏼',
    '🏃🏽',
    '🏃🏿',
    '🏃‍♀️',
    '🏃🏻‍♀️',
    '🏃🏼‍♀️',
    '🏃🏽‍♀️',
    '🏃🏾‍♀️',
    '🏃🏿‍♀️',
  ];

  return runners[Math.floor(Math.random() * runners.length)];
}

const windowSize = Dimensions.get('window');

const startRun = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: windowSize.height * 0.1,

    width: windowSize.width * 0.8,
    marginLeft: windowSize.width * 0.1,
    borderRadius: 10,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  body: {
    padding: 10,
    flex: 1,
  },
  bodyText: {
    paddingBottom: 10,
  },
  emoji: {
    fontSize: 80,
    textAlign: 'center',
    margin: 'auto',
  },
  button: {
    paddingBottom: 20,
    marginBottom: 20,
  },
  stop: {
    textAlign: 'center',
  },
});

export default class Intro extends Component {
  props: {
    onRequestStart: void => void,
    onRequestLogin: void => void,
  };
  state = {
    runner: getRunner(),
    changedRunner: 0,
    user: null,
  };

  componentDidMount() {
    getUser(user => this.setState(s => ({ ...s, user })));
  }

  _newRunner = () =>
    this.setState(s => ({
      ...s,
      runner: getRunner(),
      changedRunner: s.changedRunner + 1,
    }));

  render() {
    const { onRequestStart, onRequestLogin } = this.props;
    const { runner, changedRunner, user } = this.state;
    return (
      <View style={startRun.container}>
        <Text style={startRun.heading}>Get ready for 15 minutes of fun</Text>
        <View style={startRun.body}>
          <Text style={startRun.bodyText}>
            Find as many monuments near you, and take a picture if you are
            closer than 20m from it.
          </Text>
          <Text style={startRun.bodyText}>
            A monument is worth a different amount of points based on the amount
            of people visiting it, and the amount of times they visit. Places
            where a lot different people who leave tips are worth the most!
          </Text>
          <Text style={startRun.emoji} onPress={this._newRunner}>
            {runner}
          </Text>
          {changedRunner > 5 &&
            <Text style={startRun.stop}>
              stop n{'o'.repeat(changedRunner / 5)}w
            </Text>}
        </View>
        {user === null
          ? <Button
              title="login"
              onPress={onRequestLogin}
              style={startRun.button}
            />
          : <Button
              title="Start"
              onPress={onRequestStart}
              style={startRun.button}
            />}
      </View>
    );
  }
}
