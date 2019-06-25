const db = require('../config/mysql')();

module.exports = function (app) {
    app.use('/admin', (req, res, next) => {
        if (!req.session.user) {
            res.redirect('/login');
            return;
        } else {
            db.query(`SELECT roles_id AS roles from users
                    WHERE id = ?`, [req.session.user], function (err, rank) {
                if (err) return next(`${err} at db.query (${__filename}:9)`);
                if (rank[0].roles !== 1) {
                    res.render('login', {
                        'title': 'Log in',
                        'errorLogin': 'Du har ikke tilladelse'
                    });
                    return;
                } else {
                    next();
                }
            })
        }
    });
app.get('/admin', (req, res, next)=>{
    res.render('admin/admin_index')
})
}