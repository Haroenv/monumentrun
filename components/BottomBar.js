import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { getUser } from '../helpers/auth';
import LocationProvider from './LocationProvider';

const timer = StyleSheet.create({
  cursor: {
    backgroundColor: 'red',
  },
  container: {
    height: 5,
  },
});

const Timer = () =>
  <View style={timer.container}>
    <View style={[timer.cursor]} />
  </View>;

const notLoggedIn = StyleSheet.create({
  text: {
    textAlign: 'center',
    padding: 6,
    fontSize: 18,
  },
});

const NotLoggedIn = ({ navigate }) =>
  <View>
    <Text style={notLoggedIn.text}>
      You are not logged in, please log in before running
    </Text>
    <Button title="login" onPress={() => navigate('user')} />
  </View>;

const Bar = props =>
  <View>
    <Text>
      {16}p
    </Text>
    <Text>
      {'Saint-Jacques Tower (Tour Saint-Jacques)'}
    </Text>
    <Text>
      {52}m away
    </Text>
    <Text>Historic Site</Text>
    <Text>
      {0} monuments visited
    </Text>
    <Timer />
  </View>;

export default class Bottom extends Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    // try {
    //   const user = await getUser();
    //   this.setState({ user });
    // } catch (e) {
    //   console.warn(e);
    // }
  }

  render() {
    const { visited = [], closest, navigate } = this.props;
    const { user } = this.state;
    return (
      <LocationProvider
        render={props =>
          user === null
            ? <NotLoggedIn navigate={navigate} />
            : <Bar {...props} />}
      />
    );
  }
}
