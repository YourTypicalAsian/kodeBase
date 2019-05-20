const db = require('../config/mysql')();
const vaildate = require('../servise/validate');
const bcrypt = require('bcryptjs');

module.exports = function (app) {

    app.get('/sign-up', (req, res) => {
        res.render('sign-up', {
            title: 'Opret	 bruger!',
            content: ''
        });
    });

      app.post('/auth/signup', (req, res) => {
		let success = true;
		let errorMessage;
		db.query('SELECT username FROM users WHERE username = ?', [req.fields.username], (err, checkResults) => {
			if (checkResults.length > 0) {
				success = false;
				errorMessage = 'Brugernavn er taget';
			}
			if (!req.fields.username && !req.fields.password) {
				success = false;
				errorMessage = 'Et eller flere felter var tomme';
			}
			if (!vaildate(req.fields.username, /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)) {
				errorMessage = 'Disse bogstaver er ikke tilgængelige i brugernavn';
				success = false;
			}
			if (!vaildate(req.fields.password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
				errorMessage = 'sørg for at der indeholder et tal, lille bogstav, stort bogstav og det skal min. være på 8 karakterer';
				success = false;
			}

			if (success) {
				let hashPassword = bcrypt.hashSync(req.fields.password, 10);
				db.query('INSERT INTO users (username, password, roles_id) VALUES (?, ?, 6)', [req.fields.username, hashPassword], (err, results) => {
					if (err) throw err;
					res.redirect('/login');
				});
			} else {
				res.render('sign-up', { title: 'oprat bruger!', content: '', ...req.fields, errorMessage });
			}

		})
	})
}