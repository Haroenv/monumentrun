import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

import { mapNavigationStateParamsToProps } from '../helpers/navigation';
import Run from './Run';

export default class SingleRun extends Component {
  render() {
    const { run } = this.props;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Run run={run} style={{ height: 400 }} />
        <View>
          <Text>Yo I'm alive</Text>
        </View>
      </ScrollView>
    );
  }
}
