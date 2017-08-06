// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';
import { ref } from '../helpers/firebase';
import { customMapStyle } from '../helpers/map';
import { toLatLng, getCenter } from '../helpers/location';

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
          strokeColor={'#b1473f'}
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
