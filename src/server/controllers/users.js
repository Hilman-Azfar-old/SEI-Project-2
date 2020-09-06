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

  let newUser = (request, response) => {
    db.users.newUser(request.body, (err, result) => {
        if (err) {
            console.log(err);
            response.status(400).send('try again')
        } else {
                if (result !== null) {
                response.status(201).send('entity created');
            } else {
                response.status(400).send('try again')
            }
        }
    })
  }

  return {
    ping: ping,
    album,
    validate,
    newUser,
  }

};