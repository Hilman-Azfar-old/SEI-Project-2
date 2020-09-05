module.exports = (db) => {

  let ping = (request, response) => {
    response.send(['Api sends its regards•••\n']);
  }

  let notFound = (request, response) => {
    response.send('404 not found laaaa');
  }

  let album = (request, response) => {
    db.users.getAlbum (request.params, (err, result)=>{
        console.log(result);
        response.send(result);
    })
  }

  return {
    ping: ping,
    notFound,
    album,
  }

};