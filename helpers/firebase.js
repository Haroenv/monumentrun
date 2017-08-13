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
export const auth = firebase.auth;

export const firebaseImages = ({ run, venue }) =>
  firebase.storage().ref().child(`images/${run}/${venue}`);

type LeaderboardItem = {
  key: string,
  run: string,
  score: number,
  name: string,
  uid?: string,
};

type Leaderboard = Array<LeaderboardItem>;

export const getLeaderboard = (): Promise<Leaderboard> =>
  ref
    .child('runs')
    .orderByChild('score')
    .limitToLast(50)
    .once('value')
    .then(snapshot => {
      const leaderboard = [];
      snapshot.forEach(record => {
        const { score, name, uid } = record.val();
        leaderboard.push({
          key: record.key,
          run: record.key,
          score,
          name,
          uid,
        });
      });
      return leaderboard;
    })
    .then(s => s.filter(item => item.score > 0))
    .then(s => s.reverse())
    .then(s => s.map((v, i) => ({ position: i + 1, ...v })));

export const getUserPicture = (uid: string): Promise<string> =>
  ref
    .child(`/users/${uid}/photoURL`)
    .once('value')
    .then(s => s.val())
    .catch(() => {});
