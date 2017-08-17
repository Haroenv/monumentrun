import React, { Component } from 'react';
import { View } from 'react-native';

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
  };

  render() {
    const { runInfo, location, navigate, running, onRequestStart } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Run {...runInfo} />
        {!running && <Intro onPress={onRequestStart} />}
        {running &&
          <BottomBar navigate={navigate} {...location} {...runInfo} />}
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
  };

  _startRun = () => {
    this.setState({ run: '-KnZ1p-Vm6LzDoMnUj-t' });
  };

  render() {
    const { run } = this.state;
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
