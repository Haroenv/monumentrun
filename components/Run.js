// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';
import { ref } from '../helpers/firebase';
import { customMapStyle } from '../helpers/map';

const toLatLng = stop => ({ longitude: stop[0], latitude: stop[1] });

const Callout = ({ name }) =>
  <MapView.Callout tooltip>
    <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 2 }}>
      <Text style={{ fontSize: 20 }}>
        {name}
      </Text>
    </View>
  </MapView.Callout>;

function getCenter({ here, venues, history }) {
  function getLatLng({ here, venues, history }) {
    if (here) {
      return;
      here;
    }
    if (venues.length > 0) {
      return {
        longitude: venues[0].location.lng,
        latitude: venues[0].location.lat,
      };
    }
    if (history && history.length > 0) {
      return {
        ...history[0],
      };
    }
    return null;
  }
  const latLng = getLatLng({ here, venues, history });
  if (latLng === null) {
    return {};
  }
  return {
    region: {
      ...latLng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
  };
}

export default class Run extends Component {
  state = {
    history: [],
    venues: [],
    currentSubscription: null,
  };

  async componentDidMount() {
    const currentSubscription = await this.subscribe(this.props.run);
    this.setState({ currentSubscription });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.run !== this.props.run) {
      if (this.state.currentSubscription !== null) {
        ref.off('value', this.state.currentSubscription);
      }
      const currentSubscription = this.subscribe(newProps.run);
      this.setState({ currentSubscription });
    }
  }

  subscribe(id: string) {
    return ref.child(`runs/${id}/`).on('value', s => {
      const val = s.val();
      const history = 'history' in val ? val.history : [];
      this.setState(() => ({
        ...val,
        history: history.map(toLatLng),
      }));
    });
  }

  onMarkerPressed(marker) {
    this[marker].showCallout();
  }

  render() {
    const { history = [], venues = [] } = this.state;
    const { style } = this.props;
    return (
      <MapView
        style={{ flex: 1, ...style }}
        {...getCenter({ history, venues })}
        customMapStyle={customMapStyle}
      >
        <MapView.Polyline
          coordinates={history}
          strokeWidth={5}
          strokeColor={'red'}
          miterLimit={5}
        />
        {venues.map(
          ({ name, location: { lat: latitude, lng: longitude } }, index) =>
            <MapView.Marker
              key={index}
              text={name}
              coordinate={{
                latitude,
                longitude,
              }}
              onPress={() => this.onMarkerPressed(`marker + ${index}`)}
              ref={c => {
                this[`marker + ${index}`] = c;
              }}
            >
              <Callout name={name} />
            </MapView.Marker>
        )}
      </MapView>
    );
  }
}
