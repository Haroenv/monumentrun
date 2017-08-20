import React, { Component } from 'react';
import { View } from 'react-native';

import { TOTAL_TIME } from '../helpers/timing';
import LocationProvider from './LocationProvider';
import RunProvider from './RunProvider';
import Run from './Run';
import BottomBar from './BottomBar';
import Intro from './Intro';

class Running extends Component {
  props: {
    running: boolean,
    location: Object,
    runInfo: Object,
    navigate: string => void,
    onRequestStart: void => void,
    onStop: void => void,
    finished: boolean,
    secondsPassed: number,
  };

  onRequestLogin = () => {
    this.props.navigate('user');
  };

  render() {
    const {
      runInfo,
      location,
      navigate,
      running,
      onRequestStart,
      onStop,
      finished,
      secondsPassed,
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Run {...runInfo} nearby={location.nearby} />
        {!running &&
          <Intro
            onRequestStart={onRequestStart}
            onRequestLogin={this.onRequestLogin}
          />}
        {running &&
          <BottomBar
            navigate={navigate}
            {...location}
            {...runInfo}
            onStop={onStop}
            finished={finished}
            secondsPassed={secondsPassed}
          />}
      </View>
    );
  }
}

export default class ActiveRun extends Component {
  props: {
    navigate: string => void,
  };

  state = {
    run: undefined,
    secondsPassed: 0,
    finished: false,
  };

  _tick = () => {
    this.setState(state => {
      const { secondsPassed } = state;
      const finished = secondsPassed > TOTAL_TIME;

      if (finished) {
        this._stopRun();
      }
      return {
        ...state,
        secondsPassed: secondsPassed + 1,
        finished,
      };
    });
  };

  _startRun = () => {
    this.setState({ run: '-KnZ1p-Vm6LzDoMnUj-t' });
    this.timer = setInterval(this._tick, 1000);
  };

  _stopRun = () => {
    this.setState({ run: '-KnZ1p-Vm6LzDoMnUj-t' });
    clearInterval(this.timer);
  };

  render() {
    const { run, secondsPassed, finished } = this.state;
    const { navigate } = this.props;

    return (
      <LocationProvider
        render={location =>
          run
            ? <RunProvider
                id={run}
                render={runInfo =>
                  <Running
                    location={location}
                    runInfo={runInfo}
                    navigate={navigate}
                    running={true}
                    onStop={this._stopRun}
                    secondsPassed={secondsPassed}
                    finished={finished}
                  />}
              />
            : <Running
                location={location}
                navigate={navigate}
                running={false}
                onRequestStart={this._startRun}
              />}
      />
    );
  }
}
