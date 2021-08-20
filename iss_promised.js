const request = require('request-promise-native');

const fetchMyIP = function(){
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  return request(`https://freegeoip.app/json/${JSON.parse(body).ip}`);
};

const fetchISSFlyOverTime = function(body) {
  const coord = {latitude: JSON.parse(body).latitude, longitude: JSON.parse(body).longitude}
 return request(`http://api.open-notify.org/iss-pass.json?lat=${coord.latitude}&lon=${coord.longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTime)
    .then((data) => {
    const {response} = JSON.parse(data);
    return response;
  });
}
module.exports = { nextISSTimesForMyLocation  };