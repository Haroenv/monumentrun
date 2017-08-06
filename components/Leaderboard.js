import React, { Component } from 'react';
import { StyleSheet, FlatList, Button, View, Text } from 'react-native';
import { getLeaderboard } from '../helpers/firebase';

type Run = {
  run: string,
  name: string,
  score: number,
  position: number,
};

class TopScore extends Component {
  props: { ...Run, navigate: Function };

  render() {
    const { run, name, score, position } = this.props;
    return (
      <View>
        <Text>
          {position} {score} {name}
        </Text>
      </View>
    );
  }
}

export default class LeaderboardViews extends Component {
  state = {
    leaderboard: [],
  };
  state: {
    leaderboard: Run[],
  };
  props: {
    navigate: Function,
  };

  async componentDidMount() {
    const leaderboard = await getLeaderboard();
    this.setState({ leaderboard });
  }

  render() {
    const { navigate } = this.props;
    const topScores: Run[] = this.state.leaderboard.slice(0, 3);
    const restOfTheLeaderboard: Run[] = this.state.leaderboard.slice(3);

    return (
      <View>
        <View>
          {topScores.map(({ run, name, score, position }) =>
            <TopScore
              key={run}
              run={run}
              name={name}
              score={score}
              navigate={navigate}
              position={position}
            />
          )}
        </View>
        <FlatList
          data={restOfTheLeaderboard}
          renderItem={({ item }) => <Row navigate={navigate} {...item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

class Row extends Component {
  props: {
    navigate: Function,
    ...Run,
  };
  render() {
    const { name, score, navigate, run, position } = this.props;
    return (
      <View>
        <Button
          style={styles.item}
          title={`${position}: ${name} -  ${score}`}
          onPress={() => navigate('SingleRun', { run, name })}
        />
      </View>
    );
  }
}
