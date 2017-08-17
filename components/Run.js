// @flow

import React, { Component } from 'react';
import { MapView } from 'expo';
import { ref } from '../helpers/firebase';
import { customMapStyle } from '../helpers/map';
import { toLatLng, getCenter } from '../helpers/location';
import type { LatLng } from '../helpers/location';
import type { VenueType } from '../helpers/foursquare';

export default class Run extends Component {
  props: {
    style?: Object,
    here?: LatLng,
    history: Array<LatLng>,
    venues: Array<VenueType>,
    nearby: Array<VenueType>,
  };

  render() {
    const { style, here, history = [], venues = [], nearby = [] } = this.props;
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
        {nearby.map(
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
              pinColor="black"
            />
        )}
      </MapView>
    );
  }
}
