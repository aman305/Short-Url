const express = require('express');
const {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleRedirectUrl,
} = require('../controller/index');
const router = express.Router();
router.post('/', handleGenerateNewShortUrl);
router.get('/:shortId', handleRedirectUrl);
router.get('/analytics/:shortId', handleGetAnalytics);
module.exports = router;
