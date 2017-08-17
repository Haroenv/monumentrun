// @flow

import React, { Component } from 'react';
import { ref } from '../helpers/firebase';
import type { VenueType } from '../helpers/foursquare';
import { toLatLng } from '../helpers/location';
import type { LatLng } from '../helpers/location';

type State = {
  history: Array<LatLng>,
  name: string,
  uid: string,
  score: number,
  date: string,
  venues: Array<VenueType>,
};

export default class RunProvider extends Component {
  props: {
    render: State => React.Component,
    id: string,
  };
  state: State;
  state = {
    history: [],
    name: '',
    uid: '',
    score: 0,
    date: new Date().toISOString(),
    venues: [],
  };

  runListener = null;

  async componentWillMount() {
    const listener = await this._subscribeRun(this.props.id);
    this.runListener = listener;
  }

  componentWillUnmount() {
    this._removeListener();
  }

  _removeListener() {
    if (this.runListener) {
      ref.off('value', this.runListener);
    }
  }

  componentWillReceiveProps(newProps: { run: string }) {
    if (newProps.id !== this.props.id) {
      this._removeListener();
      this.runListener = this.subscribe(newProps.run);
    }
  }

  _subscribeRun(id: string): any {
    if (!id) {
      return new Error('run id is required');
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

  render() {
    const { render } = this.props;
    return render(this.state);
  }
}
