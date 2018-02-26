const express = require('express');

const controllers = require('../../controllers/api');

const router = express.Router();

router.get('/test', (req, res) => {
  const param = req.query.q;
  const result = controllers.getTestMessage();

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  } else {
    res.json({
      'data': result
    });
  }
});

module.exports = router;