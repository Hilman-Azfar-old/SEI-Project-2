module.exports = (db) => {

  let ping = (request, response) => {
    response.send('Api sends its regards•••\n');
  }

  return {
    ping: ping,
  }

};