const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/inventory', (req, res) => {
  db.all("SELECT * FROM cars ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).send("Database error");
    res.render('inventory/index', { cars: rows });
  });
});

router.get('/how-to-buy', (req, res) => res.render('how-to-buy'));
router.get('/about',       (req, res) => res.render('about'));

module.exports = router;
