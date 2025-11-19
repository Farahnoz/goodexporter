const db = require('./db');

// Create messages table if not exists
db.run(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

const express = require('express');
const router = express.Router();

router.get('/contact', (req, res) => res.render('contact'));
router.post('/contact', express.urlencoded({extended:true}), (req, res) => {
  const {name, email, phone, message} = req.body;
  db.run("INSERT INTO messages (name,email,phone,message) VALUES (?,?,?,?)",
    [name, email, phone, message], (err) => {
      if (err) return res.status(500).send("Error");
      res.send(`
        <h1 style="color:#00ff41; text-align:center; margin-top:100px;">Thank you!</h1>
        <p style="text-align:center; color:#fff;">We will contact you within 24 hours.</p>
        <p style="text-align:center;"><a href="/" style="color:#00ff41;">← Back to Home</a></p>
      `);
  });
});

module.exports = router;
