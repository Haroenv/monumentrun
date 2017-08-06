import React, { Component } from 'react';
import { Text, StyleSheet, FlatList, Button } from 'react-native';
import { getLeaderboard } from '../helpers/firebase';

const log = s => {
  console.log(s);
  return s;
};

export default class LeaderboardViews extends Component {
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
    const { navigate } = this.props;
    return (
      <FlatList
        data={this.state.leaderboard}
        renderItem={({ item }) => <Row navigate={navigate} {...item} />}
      />
    );
  }
}

const Row = ({ name, score, navigate, run }) =>
  <Button
    style={styles.item}
    title={`${name} -  ${score}`}
    onPress={() => navigate('run', { run })}
  />;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
