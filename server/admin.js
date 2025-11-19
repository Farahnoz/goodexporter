const express = require('express');
const router = express.Router();
const db = require('./db');
const multer = require('multer');
const upload = multer({dest: 'images/cars/'});
const fs = require('fs');
const path = require('path');

const ADMIN_PASS = "good123"; // change later if you want

router.get('/admin', (req,res) => {
  if (req.query.pass !== ADMIN_PASS) return res.send(`<h1 style="color:#00ff41; text-align:center; margin-top:200px;">Admin Login<br><br>
    <form><input type="password" name="pass" placeholder="Password">
    <button type="submit">Login</button></form></h1>`);
  db.all("SELECT * FROM cars ORDER BY id DESC", (err, cars) => {
    res.render('admin', {cars});
  });
});

router.post('/admin/add', upload.single('image'), (req,res) => {
  const {make,model,year,price,mileage,color,transmission,fuel} = req.body;
  const image = req.file ? req.file.filename : 'placeholder.jpg';
  db.run("INSERT INTO cars (make,model,year,price,mileage,color,transmission,fuel,image) VALUES (?,?,?,?,?,?,?,?,?)",
    [make,model,+year,+price,+mileage,color,transmission,fuel,image], () => res.redirect('/admin?pass='+ADMIN_PASS));
});

router.get('/admin/delete/:id', (req,res) => {
  db.run("DELETE FROM cars WHERE id=?", req.params.id, () => res.redirect('/admin?pass='+ADMIN_PASS));
});

module.exports = router;
