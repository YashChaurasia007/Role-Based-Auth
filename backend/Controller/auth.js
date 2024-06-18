const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
const argon2 = require('argon2');

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results, fields] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      res.status(401).send('Invalid username or password');
      return;
    }

    const user = results[0];

    if (await argon2.verify(user.password, password)) {
      let base_url = 'http://localhost:3000'

      if (user.role === 'admin') {
        return res.redirect(`${base_url}/dashboard/admin`);
      } else if (user.role === 'rm') {
        return res.redirect(`${base_url}/dashboard/relationship-manager/${user.user_id}`);
      } else {
        return res.redirect(`${base_url}/dashboard/dealer/${user.user_id}`);
      }

      // const userData = {
      //   id: user.user_id,
      //   username: user.username,
      //   role: user.role
      // };
      // res.json(userData);
    } else {
      // Passwords do not match
      res.status(401).send('Invalid username or password');
    }
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).send('Error fetching user data');
  }
});

// Signup endpoint
router.post('/signup', async (req, res) => {

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50),
      is_user_valid BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `)

  const { username, password, email } = req.body;

  if (username.length < 8) {
    res.status(401).send('User name should be greater than 8');
    return;
  } else if (password.length < 8) {
    res.status(401).send('Password should be greater than 8');
    return;
  }

  const [results, fields] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (results.length !== 0) {
    res.status(401).send('User already Exist');
    return;
  }

  try {
    const hash = await argon2.hash(password);
    await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hash, email]);

    console.log("User created successfully");
    res.status(201).send('User created successfully');
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Error creating user');
  }
});

module.exports = router;
