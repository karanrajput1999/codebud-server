const express = require("express");
const homepageRouter = express.Router();
const HomepageController = require("../controllers/homepage");

homepageRouter.get("/", HomepageController.homepageGet);

module.exports = homepageRouter;
