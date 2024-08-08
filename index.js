const express = require('express');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() =>
  console.log('Conntected to mongoDB')
);

app.get('/:shortId', async (req, res) => {
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
  res.redirect(entry.redirectURL);
});

app.use(express.json());
app.use('/url', urlRoute);

app.listen(PORT, () => console.log('Server started at port ', PORT));
