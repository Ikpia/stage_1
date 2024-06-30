const axios = require("axios");
const { IPinfoWrapper } = require("node-ipinfo");
const TOKEN = "8fbc9748d086c6";
const ipinfo = new IPinfoWrapper(TOKEN);

const controller = async (req, res) => {
  try {
    const { visitor_name } = req.query;
    const ip = req.headers["x-forwarded-for"] || req.ip;
    console.log(ip);
    const result = await ipinfo.lookupIp(ip);
    console.log(result);

    const response = {
      client_ip: `${ip}`, // The IP address of the requester
      location: `${result.city}`, // The city of the requester
      greeting: `Hello, ${visitor_name}!, the temperature is 11 degrees Celcius in ${result.city}`,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = controller;
