const route = require("express").Router();
const controller = require("../controller/endPointController");

route.get("/api/hello", controller);

module.exports = route;
