import foursquareApi from '@haroenv/react-foursquare';
import {
  REACT_APP_FOURSQUARE_ID,
  REACT_APP_FOURSQUARE_SECRET,
} from 'react-native-dotenv';

const foursquare = foursquareApi({
  clientID: REACT_APP_FOURSQUARE_ID,
  clientSecret: REACT_APP_FOURSQUARE_SECRET,
});

export const FOURSQUARE_CATEGORIES = [
  '4d4b7104d754a06370d81259',
  '4bf58dd8d48988d12d941735',
];

export type VenueType = {
  name: string,
  id: string,
  location: {
    latitude: number,
    longitude: number,
  },
  distance: number,
  score: number,
  category: string,
};

export async function getVenues({
  latitude,
  longitude,
  blacklist = [],
  ...query
}): Array<VenueType> {
  const { response: { venues } } = await foursquare.venues.getVenues({
    ll: `${latitude},${longitude}`,
    ...query,
  });

  const filtered =
    venues.length > 0
      ? venues.filter(({ id }) => blacklist.indexOf(id) === -1)
      : venues;

  return filtered.map(
    ({
      id,
      name,
      stats,
      location: { lat, lng, distance: dist },
      categories,
    }) => ({
      id,
      name,
      location: { latitude: lat, longitude: lng },
      distance: dist,
      score: getScore(stats),
      category: categories[0].name,
    })
  );
}

export const getVenuePhoto = id =>
  foursquare.venues.getVenuePhotos({
    venue_id: id,
    limit: 1,
  });

export function getScore({ checkinsCount, usersCount, tipCount }) {
  const weightedCheckins = checkinsCount / 400000.0;
  const weightedTips = tipCount / 2000.0 * 1.5;
  const weightedUsers = usersCount / 400000.0;

  const weightedScore = weightedCheckins + weightedTips + weightedUsers;
  return Math.max(1, Math.ceil(Math.pow(weightedScore * 10000000, 0.3)));
}

const toRadians = degrees => degrees * Math.PI / 180;

export function calculateHeading({ from, to, userHeading }) {
  const R = 6371e3; // metres
  const φ1 = toRadians(from.latitude);
  const φ2 = toRadians(to.latitude);
  const Δφ = toRadians(to.latitude - from.latitude);
  const Δλ = toRadians(to.longitude - from.longitude);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return d - toRadians(userHeading);
}

export function distance(first, second) {
  const R = 6371e3; // metres
  const p = Math.PI / 180;
  const a =
    0.5 -
    Math.cos((second.latitude - first.latitude) * p) / 2 +
    Math.cos(first.latitude * p) *
      Math.cos(second.latitude * p) *
      (1 - Math.cos((second.longitude - first.longitude) * p)) /
      2;

  return R * Math.asin(Math.sqrt(a));
}
