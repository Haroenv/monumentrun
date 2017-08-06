// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';
import { ref } from '../helpers/firebase';
import { customMapStyle } from '../helpers/map';
import { toLatLng, getCenter } from '../helpers/location';

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
    if (!id) {
      return;
    }
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
    const { style, here } = this.props;
    return (
      <MapView
        style={{ flex: 1, ...style }}
        {...getCenter({ history, venues, here })}
        customMapStyle={customMapStyle}
        showsUserLocation={true}
        userLocationAnnotationTitle={'Running here'}
        showsPointsOfInterest={false}
      >
        <MapView.Polyline
          coordinates={history}
          strokeWidth={5}
          strokeColor={'#b1473f'}
          miterLimit={5}
        />
        {venues.map(
          ({
            name,
            location: { lat: latitude, lng: longitude },
            score,
            id,
            categories: [{ shortName: category }],
          }) =>
            <MapView.Marker
              key={id}
              title={name}
              description={`${category} - ${score} points`}
              coordinate={{
                latitude,
                longitude,
              }}
            />
        )}
      </MapView>
    );
  }
}
