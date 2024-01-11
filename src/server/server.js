// Import the express library
const { match } = require('assert');
const express = require('express');
const mysql = require('mysql2');
const db_name = 'rentals'; // **********change based on your database name************
const router = express.Router();
const port = 5000;
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


app.use(express.json());

// Connect to the database

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
    });
  })

  router.route('/register')
  .post(async (req, res) => {
    const sql = `IF EXISTS SELECT 1 FROM ${req.body.userType} WHERE username = '${req.body.username}'`;
    
    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);

        return res.status(500).send('Internal Server Error');
      }

      return res.json('Username available!');
    })
  });
// tenant functionality
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
    });
  })
  // add new tenant
  .post(async (req, res) => {

    const sql = `INSERT INTO Tenant (username, password, fName, lName, email, phoneNum, DOB, homeAddress)
                VALUES ('${req.body.username}', '${req.body.password}', '${req.body.fName}', '${req.body.lName}', '${req.body.email}', '${req.body.phoneNum}', '${req.body.dob}', '${req.body.homeAddress}')`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('Username already exists!');
        return res.status(500).send('Internal Server Error');
      }

      return res.json('Tenant added!');
    });
  })
  // update tenant info
  .put(async (req, res) => {

    const sql = `UPDATE Tenant SET fName = '${req.body.fName}', lName = '${req.body.lName}', email = '${req.body.email}', phoneNum = '${req.body.phoneNum}', DOB = '${req.body.dob}', homeAddress = '${req.body.homeAddress}' WHERE username = '${req.query.username}'`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);

        return res.status(500).send('Internal Server Error');
      }

      else if (result.changedRows === 0) return res.status(404).send('Username not found!');

      return res.json('Tenant info updated!');
    });
  });


// property listing functionality
router.route('/property')
  // get property info
  .get(async (req, res) => {

    const sql = `SELECT * FROM PropertyListing WHERE propertyID = ${req.query.id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      else if (result.length === 0) return res.status(404).send('Property not found!');

      return res.json(result);
    });
  })
  // add new property listing
  .post(async (req, res) => {

    const sql = `INSERT INTO PropertyListing (price, numBedrooms, numBathrooms, propertyType, address, dateListed, isAvailable, distanceToCampus, propManUser) 
                VALUES (${req.body.price}, ${req.body.numBedrooms}, ${req.body.numBathrooms}, '${req.body.propertyType}', '${req.body.address}', '${req.body.dateListed}', ${req.body.isAvailable}, ${req.body.distanceToCampus}, '${req.body.propManUser}')`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      return res.json('Property added!');
    });
  })
  // update property info
  .put(async (req, res) => {

    const sql = `UPDATE PropertyListing SET price = ${req.body.price}, numBedrooms = ${req.body.numBedrooms}, numBathrooms = ${req.body.numBathrooms}, propertyType = '${req.body.propertyType}', address = '${req.body.address}', dateListed = '${req.body.dateListed}', isAvailable = ${req.body.isAvailable}, distanceToCampus = ${req.body.distanceToCampus}, propManUser = '${req.body.propManUser}' WHERE propertyID = ${req.query.id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      else if (result.length === 0) return res.status(404).send('Property not found!');

      return res.json('Property info updated!');
    });
  })
  // delete property listing
  .delete(async (req, res) => {

    const sql = `DELETE FROM PropertyListing WHERE propertyID = ${req.query.id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      else if (result.length === 0) return res.status(404).send('Property not found!');

      return res.json('Property deleted!');
    });
  });


// property showing functionality
router.route('/showing')
  // get a property showing's info
  .get(async (req, res) => {

    const sql = `SELECT ps.*, 
                        p.price, 
                        p.propertyType, 
                        p.address, 
                        t.fName, 
                        t.lName, 
                        t.email, 
                        t.phoneNum 
                  FROM PropertyShowing ps 
                  JOIN PropertyListing p ON ps.propertyID = p.propertyID 
                  JOIN Tenant t ON ps.tenantUser = t.username 
                  JOIN PropertyManager pm ON p.propManUser = pm.username
                  WHERE pm.username = '${req.query.username}'`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      else if (result.length === 0) return res.status(404).send('Showing not found!');

      return res.json(result);
    });
  })
  // add new property showing
  .post(async (req, res) => {

    const sql = `INSERT INTO PropertyShowing (bookingDate, bookingTime, propertyID, tenantUser) 
                  VALUES ('${req.body.bookingDate}', '${req.body.bookingTime}', ${req.body.propertyID}, '${req.body.tenantUser}')`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      return res.json('Showing booked!');
    });
  })
  // update a property showing's info
  .put(async (req, res) => {

    const sql = `UPDATE PropertyShowing SET bookingDate = '${req.body.bookingDate}', bookingTime = '${req.body.bookingTime}', propertyID = ${req.body.propertyID}, tenantUser = '${req.body.tenantUser}' WHERE showingID = ${req.query.id}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      else if (result.length === 0) return res.status(404).send('Showing not found!');

      return res.json('Showing updated!');
    });
  })
  // delete a property showing
  .delete(async (req, res) => {

    const sql = `DELETE FROM PropertyShowing WHERE bookingDate = '${req.query.date}' AND bookingTime = '${req.query.time}' AND propertyID = '${req.query.id}' AND tenantUser = '${req.query.user}'`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      else if (result.length === 0) return res.status(404).send('Showing not found!');

      return res.json('Showing deleted!');
    });
  });


// filtering properties: price range, numBedrooms, numBathrooms, propertyType, distanceToCampus, isAvailable = 1.
router.route('/property/filter')
  // get property listings from user params
  .get(async (req, res) => {

    let sql = `SELECT p.*, pi.imgName, pi.imgSrc FROM PropertyListing p LEFT JOIN PropertyImage pi ON p.propertyID = pi.propertyID WHERE isAvailable = 1`;

    //let sql = `SELECT * FROM PropertyListing WHERE isAvailable = 1`;
    let params = []

    if (req.query.minPrice) {
      sql += ' AND price >= ?';
      params.push(req.query.minPrice);
    }

    if (req.query.maxPrice) {
      sql += ' AND price <= ?';
      params.push(req.query.maxPrice);
    }

    if (req.query.numBedrooms) {
      sql += ' AND numBedrooms = ?';
      params.push(req.query.numBedrooms);
    }

    if (req.query.numBathrooms) {
      sql += ' AND numBathrooms = ?';
      params.push(req.query.numBathrooms);
    }

    if (req.query.propertyType) {
      sql += ' AND propertyType = ?';
      params.push(req.query.propertyType);
    }

    if (req.query.distanceToCampus) {
      sql += ' AND distanceToCampus <= ?';
      params.push(req.query.distanceToCampus);
    }

    db.query(sql, params, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      else if (result.length === 0) return res.status(404).send('No properties found!');

      return res.json(result);
    });
  });
  router.route('/message')
  .get(async (req, res) => {
    let sql;
    const username = req.query.username;
    const tenantSenderBool = req.query.tenantSenderBool == 1 ? true : false;

    if (tenantSenderBool) {
      // sql = `SELECT * FROM Message WHERE tenantUser = ? AND tenantSenderBool = 1`;
      sql = `SELECT Message.*, Tenant.fName, Tenant.lName, Tenant.email, Tenant.phoneNum FROM Message INNER JOIN Tenant ON Message.tenantUser = Tenant.username WHERE Message.tenantUser = ? AND Message.tenantSenderBool = 0`;
    }
    else {
      // sql = `SELECT * FROM Message WHERE propManUser = ? AND tenantSenderBool = 0`;
      sql = `SELECT Message.*, PropertyManager.fName, PropertyManager.lName, PropertyManager.email, PropertyManager.phoneNum FROM Message INNER JOIN PropertyManager ON Message.propManUser = PropertyManager.username WHERE Message.propManUser = ? AND Message.tenantSenderBool = 1`;
    }

    db.query(sql, [username], (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      }
      console.log(result);
      return res.json(result);
    });
  })
  .post(async (req, res) => {
    const sql = `INSERT INTO Message (subject, message, sendDate, sendTime, tenantUser, propManUser, tenantSenderBool) 
    VALUES ('${req.body.subject}', '${req.body.message}', '${req.body.sendDate}', '${req.body.sendTime}', '${req.body.tenantUser}', '${req.body.propManUser}', ${req.body.tenantSenderBool})`;

    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error');
      }

      return res.json('Message sent!');
    });
  });
  router.route('/manager/num-properties')
  .get(async (req, res) => {
    const sql = `SELECT pm.username, 
    pm.fName, 
    pm.lName, (
      SELECT COUNT(*) 
      FROM PROPERTYLISTING pl 
      WHERE pl.propManUser = pm.username
    ) AS numListings 
FROM PropertyManager pm
ORDER BY numListings DESC`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log('MySQL query error: ', err);
        return res.status(500).send('Internal Server Error')
      }

      return res.json(result);
    });
  });

// app routing
app.use('/api/rental', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
