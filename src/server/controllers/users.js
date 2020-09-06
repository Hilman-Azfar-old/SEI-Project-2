module.exports = (db) => {

  let ping = (request, response) => {
    response.send(['Api sends its regards•••\n']);
  }

  let album = (request, response) => {
    db.users.getAlbum(request.params, (err, result)=>{
        response.send(result);
    })
  }

  let validate = (request, response) => {
    db.users.validate(request.params, (err, result) => {
        if (result !== null) {
            response.send('Valid');
        } else {
            response.status(401).send('Bad Auth')
        }
    })
  }

  return {
    ping: ping,
    album,
    validate,
  }

};