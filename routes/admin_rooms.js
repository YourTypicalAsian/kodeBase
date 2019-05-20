const db = require('../config/mysql')();
const fs = require('fs');
const formiadble = require('express-formidable');

module.exports = function (app) {

    app.get('/admin/rooms', function (req, res) {
        db.query(`SELECT * FROM rooms`, function (err, results) {
            if (err) throw err;
            res.render('admin/admin_rooms', {
                'results': results
            });
        });
    });


       /* delete */

       app.delete('/admin/rooms/:id', function (req, res) {
        const id = req.params.id;
        db.query(`DELETE rooms FROM rooms WHERE rooms.id =?`, [id], function (err, results) {
            if (err) return next(err);
            res.status(200);
            res.end()
        })
    })

    /* create */

    app.get('/admin/rooms/create', function (req, res) {
        res.render('admin/rooms_new')
    });

    app.post('/admin/rooms/create', function (req, res, next) {
        if (!req.files || !req.files.room_img) {
            return next(new Error('Ha Ha Ha Ha Dann Daniel'));
        }
        fs.readFile(req.files.room_img.path, function (err, data) {
            if (err) {
                return next(new Error('den midlertidige fil  kunne ikke læses'));
            }
            const date = new Date().getTime();
            const newFilename = `${date}${req.files.room_img.name}`;
            const newFilePath = `./public/${newFilename}`;
            fs.renameSync(req.files.room_img.path, newFilePath);

            fs.writeFile(newFilePath, data, (err) => {
                if (err) {
                    return next(new Error('filen kunne  ikke gemmes.'));
                }

                 console.log(req.fields);

                db.query(`INSERT INTO rooms (room_name, room_img, room_price) VALUES (?, ?, ?);`, [req.fields.room_name, newFilename, req.fields.room_price], function (err) {
                    if (err) {
                        return next(new Error('filen kunne  ikke gemmes i databasen:' + err));
                    } else {
                        res.redirect('/admin/rooms')
                    }
                })
            })
        });
    });


    /* Edit */
    app.get('/admin/rooms/edit/:id', function (req, res) {
        const id = req.params.id;
        db.query('SELECT id, room_name, room_img, room_price FROM rooms WHERE id = ?', [id], function (err, results) {
            if (err) throw err
            res.render('admin/rooms_update', {
                'results': results[0]
            });
        });
    });


    app.patch('/admin/rooms/edit/:id', function (req, res, next) {
        let id = req.params.id;
        if (req.files.room_img) {
          fs.readFile(req.files.room_img.path, function (err, data) {
            if (err) {
              return next(new Error('den midlertidige fil  kunne ikke læses'));
            }
            const date = new Date().getTime();
            const newFilename = `${date}${req.files.room_img.name}`;
            const newFilePath = `./public/${newFilename}`;
            fs.renameSync(req.files.room_img.path, newFilePath);
      
            fs.writeFile(newFilePath, data, (err) => {
              if (err) {
                return next(new Error('filen kunne  ikke gemmes.'));
              }
/*               fs.unlink(`./public/${req.fields.product_img}`, function (err, data) {
                if (err) throw err
      
              }); */
      
              console.log(req.fields);
      
              db.query(`UPDATE rooms SET room_name = ?, room_img = ?, room_price = ? WHERE id = ?;`, [req.fields.room_name, newFilename, req.fields.room_price, id], function (err) {
                if (err) {
                  return next(new Error('filen kunne  ikke gemmes i databasen:' + err));
                } else {
                    res.status(200);
                    res.end();
                }
              })
            })
          });
        } // if (req.files.newFile)
        //res.send(req.fields, req.files);
      });


}