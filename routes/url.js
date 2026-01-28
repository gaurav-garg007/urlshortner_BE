const express = require("express");
const { createShortUrl, getAnalytics } = require("../controllers/url");

const route = express.Router();
route.post("/",createShortUrl);
route.get("/analytics/:id", getAnalytics);

module.exports = route;