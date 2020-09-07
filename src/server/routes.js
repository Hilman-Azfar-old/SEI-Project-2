module.exports = (app, db) => {

  const users = require('./controllers/users')(db);

// api routes here to do CRUD operations
  app.get('/api/test', users.ping)

  app.get('/api/login/:user/:pass', users.validate)

  app.get('/api/:user/album/:album', users.album)

  app.get('/api/:user/profile', users.profile)

  app.post('/api/new/user', users.newUser)

  app.post('/api/new/album', users.newAlbum)

  app.delete('/api/:user/album/:album', users.deleteAlbum)

  app.get('/api/:user/object', users.object)

  app.get('/api/*', (req, res) => {
    res.status(404).send("Nothing to see here")
  })
};