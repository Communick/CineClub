import express from 'express';
import bcrypt from 'bcrypt'; // for hashing password
import db from '../db/db.js'; // import db connection

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // check all the fields 
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'All fields must be completed!' });
  }

  try {
    // check is usermane already exists
    const queryCheck = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await db.promise().execute(queryCheck, [username]);

    if (rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Username already taken' });
    }

    // hash password
    const saltRounds = 10; // salt the password for more security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert user and hashed password
    const queryInsert = 'INSERT INTO users (username, password, account_created_date) VALUES (?, ?, NOW())';
    await db.promise().execute(queryInsert, [username, hashedPassword]);

    // success message
    res.status(201).json({ success: true, message: `User ${username} successfully registered` });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
