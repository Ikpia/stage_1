require("dotenv").config();
const axios = require("axios");
const { IPinfoWrapper } = require("node-ipinfo");
const TOKEN = process.env.TOKEN;
const API_KEY = process.env.API_KEY;
const ipinfo = new IPinfoWrapper("8fbc9748d086c6");

const controller = async (req, res) => {
  try {
    const { visitor_name } = req.query;
    const ip = req.headers["x-forwarded-for"] || req.ip;
    console.log(ip);
    const result = await ipinfo.lookupIp(ip);
    console.log(result);

    const location = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${result.city},&appid=${API_KEY}`
    );
    console.log(location.data);
    console.log(location.data[0].lat);

    const temperature = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.data[0].lat}&lon=${location.data[0].lon}&appid=${API_KEY}&units=metric`
    );
    console.log(temperature.data.main.temp);

    const response = {
      client_ip: `${ip}`, // The IP address of the requester
      location: `${result.city}`, // The city of the requester
      greeting: `Hello, ${visitor_name}!, the temperature is ${temperature.data.main.temp} degrees Celcius in ${result.city}`,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const home = async (req, res) => {
  try {
    res.send("Home route");
  } catch (error) {
    res.send(error);
  }
};

module.exports = { controller, home };
