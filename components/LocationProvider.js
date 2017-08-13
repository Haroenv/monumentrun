// @flow

import React, { Component } from 'react';
import { Location, Permissions } from 'expo';

type LocationData = {
  coords: {
    latitude: number,
    longitude: number,
    altitude: number,
    accuracy: number,
    heading: number,
    speed: number,
  },
  timestamp: number,
};

type State = {
  location?: LocationData,
  errorMessage?: 'Permission to access location was denied',
  timestamp: number,
};

export default class App extends Component {
  props: {
    render: State => React.Component,
  };
  state: State;
  state = {
    location: null,
    errorMessage: null,
    timestamp: 0,
  };

  locator = null;

  componentWillMount() {
    this._getLocationAsync();
  }

  componentWillUnmount() {
    this._removeListener();
  }

  _removeListener() {
    if (this.locator) {
      this.locator.remove();
    }
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    this.locator = await Location.watchPositionAsync(
      { enableHighAccuracy: true },
      (location, timestamp) => this.setState({ location, timestamp })
    );
  };

  render() {
    const { render } = this.props;
    return render(this.state);
  }
}
