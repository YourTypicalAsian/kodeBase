const db = require('../config/mysql')();
const fs = require('fs');
const formiadble = require('express-formidable');

module.exports = function (app) {

    app.get('/admin/ads', function (req, res) {
        db.query(`SELECT id, ads_img, ads_title FROM ads`, function (err, results) {
            if (err) throw err;
            res.render('admin/admin_ads', {
                'results': results
            });
        });
    });

    /* delete */

    app.delete('/admin/ads/:id', function (req, res) {
        const id = req.params.id;
        db.query(`DELETE ads FROM ads WHERE ads.id =?`, [id], function (err, results) {
            if (err) return next(err);
            res.status(200);
            res.end()
        })
    })

    /* create */

    app.get('/admin/ads/create', function (req, res) {
        res.render('admin/ads_new')
    });

    app.post('/admin/ads/create', function (req, res, next) {
        if (!req.files || !req.files.ads_img) {
            return next(new Error('Ha Ha Ha Ha Dann Daniel'));
        }
        fs.readFile(req.files.ads_img.path, function (err, data) {
            if (err) {
                return next(new Error('den midlertidige fil  kunne ikke læses'));
            }
            const date = new Date().getTime();
            const newFilename = `${date}${req.files.ads_img.name}`;
            const newFilePath = `./public/${newFilename}`;
            fs.renameSync(req.files.ads_img.path, newFilePath);

            fs.writeFile(newFilePath, data, (err) => {
                if (err) {
                    return next(new Error('filen kunne  ikke gemmes.'));
                }

                 console.log(req.fields);

                db.query(`INSERT INTO ads (ads_title, ads_img) VALUES (?, ?);`, [req.fields.ads_title, newFilename], function (err) {
                    if (err) {
                        return next(new Error('filen kunne  ikke gemmes i databasen:' + err));
                    } else {
                        res.redirect('/admin/ads')
                    }
                })
            })
        });
    });


    /* Edit */
    app.get('/admin/ads/edit/:id', function (req, res) {
        const id = req.params.id;
        db.query('SELECT id, ads_title, ads_img FROM ads WHERE id = ?', [id], function (err, results) {
            if (err) throw err
            res.render('admin/ads_update', {
                'results': results[0]
            });
        });
    });


    app.patch('/admin/ads/edit/:id', function (req, res, next) {
        let id = req.params.id;
        if (req.files.ads_img) {
          fs.readFile(req.files.ads_img.path, function (err, data) {
            if (err) {
              return next(new Error('den midlertidige fil  kunne ikke læses'));
            }
            const date = new Date().getTime();
            const newFilename = `${date}${req.files.ads_img.name}`;
            const newFilePath = `./public/${newFilename}`;
            fs.renameSync(req.files.ads_img.path, newFilePath);
      
            fs.writeFile(newFilePath, data, (err) => {
              if (err) {
                return next(new Error('filen kunne  ikke gemmes.'));
              }
/*               fs.unlink(`./public/${req.fields.product_img}`, function (err, data) {
                if (err) throw err
      
              }); */
      
              console.log(req.fields);
      
              db.query(`UPDATE ads SET ads_title = ?, ads_img = ? WHERE id = ?;`, [req.fields.ads_title, newFilename, id], function (err) {
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