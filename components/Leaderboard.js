import React, { Component } from 'react';
import { Text, StyleSheet, FlatList } from 'react-native';
import { getLeaderboard } from '../helpers/firebase';

const log = s => {
  console.log(s);
  return s;
};

export default class MyComponent extends Component {
  constructor() {
    super();

    this.state = {
      leaderboard: [],
    };
  }

  async componentDidMount() {
    getLeaderboard().then(leaderboard => this.setState({ leaderboard }));
  }

  render() {
    return <FlatList data={this.state.leaderboard} renderItem={Row} />;
  }
}

const Row = ({ item: { name, score } }) =>
  <Text style={styles.item}>
    {name} - {score}
  </Text>;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
