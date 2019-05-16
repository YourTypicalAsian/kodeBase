const db = require('../config/mysql')();
const fs = require('fs');
const formiadble = require('express-formidable');

module.exports = function (app) {

  app.get('/admin/sites', function (req, res) {
    db.query(`SELECT title, img, text FROM page`, function (err, results) {
      if (err) throw err;
      res.render('admin/admin_sites', {
        'results': results
      });
    });
  });

  app.get('/admin/sites/edit', function (req, res) {
    db.query('SELECT text, img, title FROM page', function (err, results) {
        if (err) throw err
        res.render('admin/sites_update', {
            'results': results[0]
        });
    });
});


  app.patch('/admin/sites/edit', function (req, res, next) {
    if (req.files.img) {
      fs.readFile(req.files.img.path, function (err, data) {
        if (err) {
          return next(new Error('den midlertidige fil  kunne ikke læses'));
        }
        const date = new Date().getTime();
        const newFilename = `${date}${req.files.img.name}`;
        const newFilePath = `./public/${newFilename}`;
        fs.renameSync(req.files.img.path, newFilePath);

        fs.writeFile(newFilePath, data, (err) => {
          if (err) {
            return next(new Error('filen kunne  ikke gemmes.'));
          }
          /*               fs.unlink(`./public/${req.fields.img}`, function (err, data) {
                          if (err) throw err
                
                        }); */

          console.log(req.fields);

          db.query(`UPDATE page SET title = ?, img = ?, text = ?;`, [req.fields.title, newFilename, req.fields.text], function (err) {
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