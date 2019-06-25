const express = require('express');

module.exports = function (app) {
    app.set('views', 'views'); // In which directory are views located
    app.set('view engine', 'ejs'); // Which view engine to use
    app.use(express.static('./public')); // Where are static files located
}