/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // get all pics from one album for specific user
  let getAlbum = (params, callback) => {
    const values = [params.user,
                    params.album];

    const query = `SELECT img_url
                   FROM images
                   WHERE album_id =
                   ( SELECT id
                     FROM gallery
                     WHERE album = $2
                     AND user_id =
                     ( SELECT id
                       FROM users
                       WHERE name = $1
                     )
                   );`
    dbPoolInstance.query(query, values, (error, queryResult) => {
      if( error ){

        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){

          callback(null, queryResult.rows);
        }else{

          callback(null, null);
        }
      }
    });
  };

  let validate = (params, callback) => {
    const values = [params.user,
                    params.pass];

    const query = `SELECT id
                   FROM users
                   WHERE name = $1
                   AND password = $2`

    dbPoolInstance.query(query, values, (error, queryResult) => {
        if (error){
            callback(error, null)
        } else {
            if (queryResult.rows.length > 0) {
                callback(null, queryResult.rows)
            } else {
                callback(null, null)
            }
        }
    })
  }

  let newUser = (params, callback) => {
    const values = [params.username,
                    params.password];

    const query = `INSERT INTO users
                   (name, password)
                   VALUES
                   ($1, $2)
                   RETURNING id`

    dbPoolInstance.query(query, values, (error, queryResult) => {
        if (error){
            callback(error, null)
        } else {
            if (queryResult.rows.length > 0) {
                callback(null, queryResult.rows)
            } else {
                callback(null, null)
            }
        }
    })
  }

  let profile = (params, callback) => {
    const values = [params.user];

    const query = `SELECT description
                   FROM profiles
                   WHERE user_id = (
                     SELECT id
                     FROM users
                     WHERE name = $1
                   )`

    dbPoolInstance.query(query, values, (error, queryResult) => {
        if (error){
            callback(error, null)
        } else {
            if (queryResult.rows.length > 0) {
                callback(null, queryResult.rows)
            } else {
                callback(null, null)
            }
        }
    })
  }

  return {
    getAlbum,
    validate,
    newUser,
    profile,
  };
};