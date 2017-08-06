import React, { Component } from 'react';
import { Location, Permissions } from 'expo';

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
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
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    this.locator = await Location.watchPositionAsync(
      { enableHighAccuracy: true },
      (location, timestamp) => this.setState({ location })
    );
  };

  render() {
    const { render } = this.props;
    console.log(navigator.geolocation);
    return render(this.state);
  }
}
