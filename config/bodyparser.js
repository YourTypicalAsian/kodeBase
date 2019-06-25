const formidable = require('express-formidable');
module.exports = function (app) {
    app.use(formidable());

}