const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { setUser } = require('../service/auth');

async function handleUserSignUp(req, res) {
  const { email, name, password } = req.body;
  await User.create({ name, email, password });
  return res.render('home');
}

// without jwt token
// async function handleUserLogin(req, res) {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email, password });
//   if (!user)
//     return res.render('login', {
//       error: 'Invalid username or password',
//     });

//   const sessionId = uuidv4();
//   setUser(sessionId, user);
//   res.cookie('uid', sessionId); // create cookies
//   return res.redirect('/');
// }

// with jwt token
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render('login', {
      error: 'Invalid username or password',
    });

  const token = setUser(user);
  return res.json({ token });
  // res.cookie('uid', token); // create cookies
  // return res.redirect('/');
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
