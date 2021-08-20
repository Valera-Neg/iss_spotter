const { /*fetchMyIP, fetchCoordsByIP, fetchISSFiyOverTime,*/ nextISSTimesForMyLocation } = require('./iss');
/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work! ", error);
    return;
  }
  console.log("Current IP: ", ip);

  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work! ", error);
      return;
    }
    console.log('Current coordinates:' , coordinates);

    fetchISSFiyOverTime(coordinates, (error, FlyOvertimes) => {
      if (error) {
        console.log("It didn't work! ", error);
        return;
      }
      nextISSTimesForMyLocation(FlyOvertimes);
    });
  });
});
*/

const printPassTime = function(passTime) {
  for (const pass of passTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTime(passTimes);
});