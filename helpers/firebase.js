import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA6vOOiI1nl6gmtFuIPlCUZiZMTC_XUGBo',
  authDomain: 'monumentrun-1cc39.firebaseapp.com',
  databaseURL: 'https://monumentrun-1cc39.firebaseio.com',
  projectId: 'monumentrun-1cc39',
  storageBucket: 'monumentrun-1cc39.appspot.com',
  messagingSenderId: '430880527135',
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const googleAuthProvider = new firebaseAuth.GoogleAuthProvider();
export const githubAuthProvider = new firebaseAuth.GithubAuthProvider();

export const firebaseImages = ({ run, venue }) =>
  firebase.storage().ref().child(`images/${run}/${venue}`);

export const getLeaderboard = () =>
  ref
    .child('runs')
    .orderByChild('score')
    .limitToLast(50)
    .once('value')
    .then(snapshot => {
      const leaderboard = [];
      snapshot.forEach(record => {
        const { score, name } = record.val();
        leaderboard.push({
          key: record.key,
          run: record.key,
          score,
          name,
        });
      });
      return leaderboard;
    })
    .then(s => s.filter(item => item.score > 0))
    .then(s => s.reverse());
