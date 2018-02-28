const express = require("express");

const controllers = require("../../controllers/api");

const router = express.Router();

router.get("/headlines", (req, res) => {
  controllers.getRecentHeadlinesAll().then(result => {
    res.status(200).send(result);
  });
});

router.get("/resources", (req, res) => {
  const resources = controllers.getResourceData();
  res.status(200).send(resources);
});

router.get("/tags", (req, res) => {
  const tags = controllers.getTags();
  res.status(200).send(tags);
});

module.exports = router;
