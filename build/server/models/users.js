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
                   ( SELECT album_id
                     FROM gallery
                     WHERE album = $2
                     AND user_id =
                     ( SELECT user_id
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

    const query = `SELECT user_id
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
                   RETURNING user_id`

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

  let object = (params, callback) => {
    const values = [params.user];

    const query = `SELECT album_id, album,
                   ARRAY_AGG( album || ':' || img_url || ':' || pos
                      ORDER BY pos
                   ) urls
                   FROM users
                   INNER JOIN gallery
                   USING (user_id)
                   LEFT JOIN images
                   USING (album_id)
                   WHERE users.name = $1
                   GROUP BY gallery.album_id;`

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

  let newAlbum = (params, callback) => {
    const values = [params.username,
                    params.title];

    const query = `INSERT INTO gallery
                   (user_id, album)
                   VALUES
                   ((SELECT user_id FROM users WHERE name = $1), $2)
                   RETURNING album_id`

    dbPoolInstance.query(query, values, (error, queryResult) => {
        if (error){
            callback(error, null)
        } else {
            if (queryResult.rows.length > 0) {
                callback(null, queryResult.rows[0])
            } else {
                callback(null, null)
            }
        }
    })
  }

    let deleteAlbum = (params, callback) => {
    const values = [params.user,
                    params.album_id];

    const values2 = [params.album_id]

    const query = `DELETE FROM gallery
                   WHERE user_id =
                   (SELECT user_id FROM users WHERE name = $1)
                   AND album_id = $2
                   RETURNING album_id`

    const query2 = `DELETE FROM images
                   WHERE album_id = $1`

    dbPoolInstance.query(query, values, (error, queryResult) => {
        if (error){
            callback(error, null)
        } else {
            dbPoolInstance.query(query2, values2, (error, queryResult) => {
                if (error) {
                    callback(error, null)
                } else {
                    callback(null, queryResult)
                }
            })
        }
    })
  }

    let newAlbumPicture = (params, callback) => {
    const values = [params.username,
                    params.title,
                    params.img_url,
                    params.pos];

    const query = `INSERT INTO images
                   (album_id, img_url, pos)
                   VALUES
                   (
                        (
                          SELECT album_id FROM gallery
                          WHERE user_id =
                            (
                              SELECT user_id FROM users
                              WHERE name = $1
                            )
                          AND album = $2
                        ), $3, $4
                    )
                   RETURNING images_id`

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

  let deletePicture = (body, callback) => {
    const values = [body.albumId,
                    body.pos];


    const query = `DELETE FROM images
                   WHERE album_id = $1
                   AND pos = $2`

    dbPoolInstance.query(query, values, (error, queryResult) => {
        if (error){
            callback(error, null)
        } else {
            callback(null, queryResult)
        }
    })
  }


  return {
    getAlbum,
    validate,
    newUser,
    profile,
    object,
    newAlbum,
    deleteAlbum,
    newAlbumPicture,
    deletePicture,
  };
};