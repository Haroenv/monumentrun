import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';

import HelpText from '../assets/help.txt.js';

const styles = StyleSheet.create({
  paragraph: {
    margin: 8,
    fontSize: 16,
  },
});

class HelpView extends Component {
  static navigationOptions = {
    tabBarLabel: 'Help',
    title: 'Help',
    tabBarIcon: ({ tintColor, focused }) =>
      <Ionicons
        name={focused ? 'ios-help-circle' : 'ios-help-circle-outline'}
        size={32}
        style={{ color: tintColor }}
      />,
  };

  render() {
    return (
      <View>
        <Text style={styles.paragraph}>
          {HelpText}
        </Text>
      </View>
    );
  }
}

export default StackNavigator({
  Help: {
    screen: HelpView,
  },
});
