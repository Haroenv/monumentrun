import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getLeaderboard, getUserPicture } from '../helpers/firebase';

type Run = {
  run: string,
  name: string,
  score: number,
  position: number,
  uid: string,
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  topImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  topList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
});

class Profile extends Component {
  props: {
    uri?: string,
  };
  render() {
    const { uri } = this.props;

    if (uri === null) {
      return null;
    }
    return <Image style={styles.topImage} source={{ uri }} />;
  }
}

class TopScore extends Component {
  props: {
    navigate: string => void,
    ...Run,
  };

  state = {
    picture: null,
  };

  async componentDidMount() {
    const picture = await getUserPicture(this.props.uid);
    this.setState({ picture });
  }

  render() {
    const { run, name, score, position, navigate } = this.props;
    const { picture } = this.state;
    return (
      <View>
        <TouchableOpacity onPress={() => navigate('SingleRun', { run, name })}>
          <Text>
            {position}
          </Text>
          <Profile uri={picture} />
          <Text>
            {score}
          </Text>
          <Text>
            {name}
          </Text>
        </TouchableOpacity>
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
    navigate: string => void,
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
        <View style={styles.topList}>
          {topScores.map(({ run, name, score, position, uid }) =>
            <TopScore
              key={run}
              run={run}
              name={name}
              score={score}
              navigate={navigate}
              position={position}
              uid={uid}
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

class Row extends Component {
  props: {
    navigate: string => void,
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
