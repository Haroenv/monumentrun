// @flow

import firebase from 'firebase';
import type { LatLng } from './location';
import type { VenueType } from './foursquare';
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

export function createRun({ uid, name }: { uid: string, name: string }) {
  const date = new Date().toISOString();

  const runId = ref
    .child('runs')
    .push({ name, score: 0, history: [], venues: [], date, uid }).key;

  ref
    .child(`users/${uid}`)
    .once('value')
    .then(s => s.val())
    .then(s =>
      ref
        .child(`users/${uid}`)
        .set({ ...s, name, runs: { ...s.runs, [runId]: { score: 0, date } } })
    );
  return runId;
}

export async function addHistory({
  run,
  latitude,
  longitude,
}: {
  run: string,
  latitude: number,
  longitude: number,
}) {
  const s = await ref.child(`runs/${run}/history`).once('value');
  const history: Array<LatLng> = s.val() || [];
  return ref
    .child(`runs/${run}/history`)
    .set([...history, [longitude, latitude]]);
}

export async function visitVenue({
  run,
  venue,
}: {
  run: string,
  venue: VenueType,
}) {
  const venues: Array<LatLng> =
    (await ref.child(`runs/${run}/venues`).once('value')).val() || [];
  const score: number =
    (await ref.child(`runs/${run}/score`).once('value')).val() || 0;
  const uid: string = (await ref.child(`runs/${run}/uid`).once('value')).val();

  const newScore = score + venue.score;

  ref.child(`runs/${run}/venues`).set([...venues, venue]);
  ref.child(`runs/${run}/score`).set(newScore);
  ref.child(`users/${uid}/runs/${run}/score`).set(newScore);
}
