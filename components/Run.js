// @flow

import React, { Component } from 'react';
import { MapView } from 'expo';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { customMapStyle } from '../helpers/map';
import { isNear } from '../helpers/location';
import type { LatLng } from '../helpers/location';
import type { VenueType } from '../helpers/foursquare';

export default class Run extends Component {
  props: {
    style?: StyleObj,
    here?: LatLng,
    history: Array<LatLng>,
    venues: Array<VenueType>,
    nearby: Array<VenueType>,
  };
  map = undefined;

  render() {
    const { style, history = [], venues = [], nearby = [] } = this.props;

    return (
      <MapView
        style={[{ flex: 1 }, style]}
        customMapStyle={customMapStyle}
        showsUserLocation={true}
        userLocationAnnotationTitle={'Running here'}
        showsPointsOfInterest={false}
        ref={map => {
          this.map = map;
        }}
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
            categories: [{ shortName }],
            category,
          }) =>
            <MapView.Marker
              key={id}
              title={name}
              description={`${category
                ? category
                : shortName} - ${score} points`}
              coordinate={{
                latitude,
                longitude,
              }}
              pinColor="red"
            />
        )}
        {nearby.map(
          ({
            name,
            location: { latitude, longitude },
            score,
            id,
            category,
            distance,
          }) =>
            <MapView.Marker
              key={id}
              title={name}
              description={`${category} - ${score} points`}
              coordinate={{
                latitude,
                longitude,
              }}
              pinColor={isNear(distance) ? 'green' : 'grey'}
            />
        )}
      </MapView>
    );
  }
}
