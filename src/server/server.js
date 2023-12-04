// Import the express library
const express = require('express');
const mysql = require('mysql2');
const db_name = 'rentals'; // **********change based on your database name************
const router = express.Router();

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

app.use(express.json());

// Connect to the database

router.route('/tenant')
  // get tenant info
  .get(async (req, res) => {

    const sql = `SELECT fName, lName, email, phoneNum, DOB, homeAddress FROM Tenant WHERE username = '${req.query.username}'`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      } else if (result.length === 0) return res.status(404).send('Username not found!');

      return res.json(result);
    })
  })
  // update tenant info
  .put(async (req, res) => {
    console.log(req.query.username)
    const sql = `UPDATE Tenant SET fName = '${req.body.fName}', lName = '${req.body.lName}', email = '${req.body.email}', phoneNum = '${req.body.phone}', DOB = '${req.body.dob}', homeAddress = '${req.body.homeAddress} WHERE username = '${req.query.username}'`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      } 
      console.log(result);
      return res.json(result);
    })
  });

router.route('/login')
  // user login
  .post(async (req, res) => {

    const sql = `SELECT username, password FROM ${req.body.userType} WHERE username = '${req.body.username}'`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      } 

      else if (result.length === 0) return res.status(404).send('Username not found!');

      else if (result[0].password !== req.body.password) return res.status(401).send('Incorrect password!'); 

      return res.json({userType: req.body.userType, username: result[0].username, message: 'Login Successful!'});
    })
  })

app.use('/api/rental', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

