// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';
import { ref } from '../helpers/firebase';

const toLatLng = stop => ({ longitude: stop[0], latitude: stop[1] });

const Callout = ({ name }) =>
  <MapView.Callout tooltip>
    <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 2 }}>
      <Text style={{ fontSize: 20 }}>
        {name}
      </Text>
    </View>
  </MapView.Callout>;

export default class Run extends Component {
  state = {
    history: [],
    venues: [],
  };

  componentDidMount() {
    const { run } = this.props;
    this.subscribe(run);
  }

  center() {
    if (this.state.history.length === 0) {
      return {};
    }
    return {
      region: {
        ...this.state.history[0],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    };
  }

  subscribe(id: string) {
    return ref.child(`runs/${id}/`).on('value', s => {
      const val = s.val();
      this.setState(() => ({
        ...val,
        history: val.history.map(toLatLng),
      }));
    });
  }

  onMarkerPressed(marker) {
    this[marker].showCallout();
  }

  render() {
    const { history, venues } = this.state;

    return (
      <MapView
        style={{
          width: '100%',
          height: '100%',
        }}
        {...this.center()}
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
