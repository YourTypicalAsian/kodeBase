const db = require('../config/mysql')();
const fs = require('fs');
const formiadble = require('express-formidable');

module.exports = function (app) {


    app.get('/rooms', function (req, res) {
        db.query(`SELECT * FROM rooms WHERE reserved = 0`, function (err, results) {
            if (err) throw err;
            res.render('rooms', {
                'results': results
            });
        });
    });

    app.get('/rooms/soeg', function (req, res, next){
        db.query(`SELECT * FROM rooms WHERE room_name LIKE ? AND reserved = 0`,
        [`%${req.query.searchword}%`, `%${req.query.searchword}%`], function (err, results) {
            if (err) return next(err);
            res.render('rooms', {'results': results});
        })
    })

    app.get('/room/:id', function (req, res) {
        db.query(`SELECT * FROM rooms WHERE id = ?`, [req.params.id], function (err, results) {
            if (err) throw err;
            res.render('room', {
                'results': results[0]
            });
        });
    });

    app.get('/room/reciept/:id', function (req, res) {
        db.query(`SELECT * FROM rooms WHERE id = ?`, [req.params.id], function (err, results) {
            if (err) throw err;
            res.render('reciept', {
                'results': results[0]
            });
        });
    });

    app.post('/room/reciept/:id', function (req, res, next) {
        db.query(`INSERT INTO booking (user_name, user_phone, room_id) VALUES (?, ?, ?);`, [req.fields.user_name, req.fields.user_phone, req.params.id], function (err, results) {
            if (err) throw err;
            db.query('SELECT * FROM rooms WHERE id = ?', [req.params.id], function (err, results) {
                if (err) throw err;
                db.query(`UPDATE rooms SET reserved = ? WHERE id = ?`, [1, req.params.id], function (err) {
                    if (err) throw err;
                    console.log(results);
                    res.render('reciept', {
                        'results': results[0]
                    });
                });
            });
        })
    })
}