const route = require('express').Router();
const controller = require('../controller/endPointController')

route.get('/api', controller);

module.exports = route;