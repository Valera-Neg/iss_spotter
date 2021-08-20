const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    
    if (error) return callback(error, null);
      
    
    
    if (response.statusCode !== 200) {
      const msg = `Status, Code ${response.statusCode} when fetching IP. Responce: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ipA = JSON.parse(body).ip;
    callback(null, ipA);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
  
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
     
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    const coord = {latitude: JSON.parse(body).latitude, longitude: JSON.parse(body).longitude};
    callback(null, coord);
  });
};


const fetchISSFiyOverTime = function(coord, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coord.latitude}&lon=${coord.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const timeArr = JSON.parse(body).response;
    callback(null, timeArr);
  });
};


/*
const nextISSTimesForMyLocation = function(timeDur) {
  for (let td of timeDur) {
    let d = new Date(null);
    d.setTime(td.risetime * 1000);
    console.log(`Next pass at ${d.toString()} for ${td.duration} seconds!`);
  }
};
*/


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error. null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFiyOverTime(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = {/* fetchMyIP, fetchCoordsByIP, fetchISSFiyOverTime,*/ nextISSTimesForMyLocation };