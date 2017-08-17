// @flow

import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

import Run from './Run';
import RunProvider from './RunProvider';
import type { VenueType } from '../helpers/foursquare';

class Venue extends Component {
  props: VenueType;
  render() {
    const { name } = this.props;
    return (
      <View>
        <Text>
          {name}
        </Text>
      </View>
    );
  }
}

export default class SingleRun extends Component {
  props: {
    run: string,
  };

  render() {
    return (
      <RunProvider
        id={this.props.run}
        render={props =>
          <ScrollView style={{ flex: 1 }}>
            <Run {...props} style={{ height: 400 }} />
            <View>
              <Text>Venues visited</Text>
              {props.venues.map(venue => <Venue key={venue.id} {...venue} />)}
            </View>
          </ScrollView>}
      />
    );
  }
}
