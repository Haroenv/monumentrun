import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';

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
});

export default class Intro extends Component {
  props: {
    onPress: void => void,
  };
  state = {
    runner: getRunner(),
    changedRunner: 0,
  };

  _newRunner = () =>
    this.setState(s => ({
      ...s,
      runner: getRunner(),
      changedRunner: s.changedRunner + 1,
    }));

  render() {
    const { onPress } = this.props;
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
            {this.state.runner}
          </Text>
        </View>
        <Button title="Start" onPress={onPress} style={startRun.button} />
      </View>
    );
  }
}
