const db = require('../config/mysql')();
const bcrypt = require('bcryptjs');

module.exports = function (app) {
	app.get('/login', (req, res, next) => {
		if (req.query.status && req.query.status === 'badcredentials') {
			res.locals.status = 'ugyldigt brugernavn eller adgangskode';
		}
		res.render('login', { title: 'Log ind' });
	});

	app.post('/auth/login', (req, res, next) => {
		db.query('SELECT id, password FROM users WHERE username = ?', [req.fields.username], (err, result) => {
			if (err) return next(`${err} at db.query (${__filename}:9:5)`);
			if (bcrypt.compareSync(req.fields.password, result[0].password)) {
				req.session.user = result[0].id;
				app.locals.login = true;
				
				res.redirect('/admin');
			} else{
				res.redirect('/login?status=badcredentials');
				return;
			}
			
		});
	});

	app.get('/auth/logout', (req, res, next) => {
		req.session.destroy();
		app.locals.login = false;
		res.redirect('/');
	});
};


console.log(bcrypt.hashSync('1234', 10))
