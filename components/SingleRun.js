// @flow

import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

import { mapNavigationStateParamsToProps } from '../helpers/navigation';
import { ref } from '../helpers/firebase';
import { toLatLng } from '../helpers/location';
import type { VenueType } from '../helpers/foursquare';

import Run from './Run';

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
  state = {
    history: [],
    venues: [],
    currentSubscription: null,
  };

  async componentDidMount() {
    const currentSubscription = await this.subscribe(this.props.run);
    this.setState({ currentSubscription });
  }

  componentWillReceiveProps(newProps: { run: string }) {
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

  render() {
    const { run } = this.props;
    const { venues } = this.state;

    return (
      <ScrollView style={{ flex: 1 }}>
        <Run run={run} style={{ height: 400 }} />
        <View>
          <Text>Yo I'm alive</Text>
          {venues.map(venue => <Venue key={venue.id} {...venue} />)}
        </View>
      </ScrollView>
    );
  }
}
