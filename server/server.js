const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

require('./db'); // database + seed

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..')));
app.use(express.urlencoded({ extended: true })); // needed for forms

// Safe admin detection — works for GET and POST
app.use((req, res, next) => {
  const pass = (req.query && req.query.pass) || (req.body && req.body.pass) || '';
  res.locals.isAdmin = (pass === 'good123');
  next();
});

// Routes
app.get('/', (req, res) => res.render('index'));
app.use('/', require('./routes'));     // inventory, how-to-buy, about
app.use('/', require('./contact'));    // contact page + form
app.use('/', require('./admin'));      // admin panel

app.listen(PORT, () => {
  console.log(`\n   GOOD EXPORTER IS LIVE & ROCK SOLID!`);
  console.log(`   → http://localhost:${PORT}`);
  console.log(`   → http://localhost:${PORT}/inventory`);
  console.log(`   → http://localhost:${PORT}/admin?pass=good123\n`);
});
