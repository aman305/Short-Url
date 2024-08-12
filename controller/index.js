const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: 'URl is required' });
  const shortId = shortid.generate();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleRedirectUrl(req, res) {
  const date = new Date(Date.now());
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timeStamp: date.toLocaleString(),
        },
      },
    }
  );
  res.redirect(entry?.redirectURL);
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleRedirectUrl,
};
