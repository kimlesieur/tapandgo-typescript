
//integrate JSDoc to precise type and return

export function formatName(name) {
  if(typeof name === "string" && name.length > 1){
    const str = name.split('-')[1].toLowerCase();
    const nameCap = str.replace(str.charAt(0), str.charAt(0).toUpperCase());
    return nameCap;
  }
  return name;
}

export function arrayFilter(array, value) {
  const term = value.toLowerCase();
  return array.filter(elem => {
    return elem.name.toLowerCase().match(new RegExp(term, 'g')) ||
      elem.address.toLowerCase().match(new RegExp(term, 'g')) ||
      elem.number.toString().match(new RegExp(term, 'g'));
  });
}

export function getNearestStations(coord, array, map) {
  const filteredArray = array.filter(station => station.available_bike_stands >= 1 && station.available_bikes >= 1 && station.status === "Ouverte");
  return filteredArray.reduce((acc, curr) => map.distance([coord.lat, coord.long], [curr.lat, curr.long]) < map.distance([coord.lat, coord.long], [acc.lat, acc.long]) ? curr : acc);
}