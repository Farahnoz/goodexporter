const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, '../db/cars.db'));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    make TEXT, model TEXT, year INTEGER, price INTEGER,
    mileage INTEGER, color TEXT, transmission TEXT, fuel TEXT, image TEXT
  )`);
  db.run(`DELETE FROM cars`);
  const stmt = db.prepare(`INSERT INTO cars (make,model,year,price,mileage,color,transmission,fuel,image) VALUES (?,?,?,?,?,?,?,?,?)`);
  const cars = [
    ["Hyundai","Grandeur",2022,18500,42000,"White","Automatic","Gasoline","hyundai-grandeur.jpg"],
    ["Kia","K5",2023,22900,15000,"Black","Automatic","Gasoline","kia-k5.jpg"],
    ["Genesis","G80",2021,34800,38000,"Silver","Automatic","Gasoline","genesis-g80.jpg"],
    ["Hyundai","Sonata",2022,16900,55000,"Blue","Automatic","Gasoline","hyundai-sonata.jpg"],
    ["Kia","Sorento",2021,25900,48000,"Gray","Automatic","Diesel","kia-sorento.jpg"],
    ["Genesis","GV70",2022,41900,29000,"Red","Automatic","Gasoline","genesis-gv70.jpg"]
  ];
  cars.forEach(c => stmt.run(c));
  stmt.finalize();
  console.log("Database ready – 6 cars loaded");
});
module.exports = db;
