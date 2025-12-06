const router = require('express').Router();
const jwt    = require('jsonwebtoken');
const SECRET = 'YourVerySecretKey';  // same demo key

// single test user: first name as both username and password
const TEST_USER = { username: 'Lakshmi', password: 'Lakshmi' };

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== TEST_USER.username || password !== TEST_USER.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' });
  res.json({ token });
});

module.exports = router;

