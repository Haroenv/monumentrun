import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { getLeaderboard } from '../helpers/firebase';

type Run = {
  run: string,
  name: string,
  score: number,
  position: number,
};

class TopScore extends Component {
  props: {
    navigate: Function,
    ...Run,
  };

  render() {
    const { run, name, score, position, navigate } = this.props;
    return (
      <TouchableOpacity onPress={() => navigate('SingleRun', { run, name })}>
        <Text>
          {position} {score} {name}
        </Text>
      </TouchableOpacity>
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
        <View style={{ flexDirection: 'row' }}>
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
      <TouchableOpacity onPress={() => navigate('SingleRun', { run, name })}>
        <Text style={styles.item}>
          {position}: {name} - {score}
        </Text>
      </TouchableOpacity>
    );
  }
}
