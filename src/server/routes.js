module.exports = (app, db) => {

  const users = require('./controllers/users')(db);

// api routes here to do CRUD operations
  app.get('/api/test', users.ping)

  app.get('/api/:user/:pass', users.validate)

  app.get('/api/:user/:album', users.album)

  app.get('/api/*', (req, res) => {
    res.status(404).send("Nothing to see here")
  })
};