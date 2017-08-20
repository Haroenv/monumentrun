// @flow

import { Component } from 'react';
import type React from 'react';
import { Location, Permissions } from 'expo';
import { getVenues, FOURSQUARE_CATEGORIES } from '../helpers/foursquare';
import type { VenueType } from '../helpers/foursquare';

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
  venues: VenueType[],
  errorMessage?: 'Permission to access location was denied',
};

export default class LocationProvider extends Component {
  props: {
    render: State => React.Component<*, *, *>,
    onMove?: ({ latitude: number, longitude: number }) => void,
  };
  state: State;
  state = {
    location: null,
    venues: [],
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

  _updateLocation = async location => {
    const { onMove } = this.props;
    this.setState(s => ({ ...s, location }));
    const { latitude, longitude } = location.coords;
    if (typeof onMove === 'function') {
      onMove({ latitude, longitude });
    }

    const nearby = await getVenues({
      latitude,
      longitude,
      radius: 500,
      categoryId: FOURSQUARE_CATEGORIES.join(','), // arts & entertainment
    });

    this.setState(s => ({ ...s, nearby }));
  };

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    this.locator = await Location.watchPositionAsync(
      { enableHighAccuracy: true },
      this._updateLocation
    );
  };

  render() {
    const { render } = this.props;
    // $FlowFixMe weird typing here
    return render(this.state);
  }
}
