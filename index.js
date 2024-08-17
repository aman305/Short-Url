const express = require('express');
const path = require('path');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const app = express();
const PORT = 8001;
const cookieParser = require('cookie-parser');
const { restrictToLoginUserOnly, checkAuth } = require('./middlewares/auth');
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

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/url', restrictToLoginUserOnly, urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);

app.listen(PORT, () => console.log('Server started at port ', PORT));
