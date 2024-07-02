const route = require("express").Router();
const { controller, home } = require("../controller/endPointController");

route.get("/api/hello", controller);
route.get("/", home);

module.exports = route;
