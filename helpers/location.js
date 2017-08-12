export type LatLng = { longitude: number, latitude: number };
type MaybeLatLng = LatLng | null;

export const toLatLng = (stop: [number, number]) => ({
  longitude: stop[0],
  latitude: stop[1],
});

function getLatLng({
  here,
  venues,
  history,
}: {
  here: LatLng,
  venues: Array<{ location: { lng: number, lat: number } }>,
  history: Array<LatLng>,
}): MaybeLatLng {
  if (here) {
    return here;
  }
  if (venues.length > 0) {
    return {
      longitude: venues[0].location.lng,
      latitude: venues[0].location.lat,
    };
  }
  if (history && history.length > 0) {
    return {
      ...history[0],
    };
  }
  return null;
}

type Center = {
  ...LatLng,
  latitudeDelta: number,
  longitudeDelta: number,
};
type Nothing = {||};

export function getCenter({ here, venues, history }): Nothing | Center {
  const latLng = getLatLng({ here, venues, history });
  if (latLng === null) {
    return {};
  }
  return {
    region: {
      ...latLng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
  };
}
