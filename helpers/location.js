export const toLatLng = stop => ({ longitude: stop[0], latitude: stop[1] });

export function getCenter({ here, venues, history }) {
  function getLatLng({ here, venues, history }) {
    if (here) {
      return;
      here;
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
