const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTime = function(passTime) {
  for (const pass of passTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
  }
};
nextISSTimesForMyLocation()
  .then((passTime) => {
    printPassTime(passTime);
  })
  .catch((error) => {
    console.log("It didn't work:", error.message);
  })

  
  