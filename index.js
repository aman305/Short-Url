const express = require('express');
const path = require('path');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');
const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() =>
  console.log('Conntected to mongoDB')
);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/tests', async (req, res) => {
  const allUrls = await URL.find({});
  return res.render('home', {
    urls: allUrls,
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/url', urlRoute);
app.use('/', staticRoute);

app.listen(PORT, () => console.log('Server started at port ', PORT));
