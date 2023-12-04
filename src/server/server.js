// Import the express library
const express = require('express');
const mysql = require('mysql2');
const db_name = 'rentals'; // **********change based on your database name************
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: db_name
});
const app = express();
app.use(express.json());
// Connect to the database
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log(`Connected to database ${db_name}`);
    }
); 

app.get('/data', (req, res) => {
    const sql = `
      SELECT pm.username, pm.fName, pm.lName, 
             (SELECT MAX(pl.price) 
              FROM PropertyListing pl 
              WHERE pl.propManUser = pm.username) AS MaxPrice
      FROM PropertyManager pm;
    `;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred while fetching data');
      } else {
        res.json(result);
        console.log(result);
      }
    });
  });
// Create an instance of express

// Define a port
const port = 5000;

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});