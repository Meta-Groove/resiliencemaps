const express = require('express');
const app = express();
const bp = require('body-parser');
const bpj = require('body-parser').json();
// const  mysql = require('mysql');
const cors = require('cors')
const fetch = require('node-fetch')
require('dotenv').config();

const pinToIPFS  = require('./ipfsStorage')

app.use(bp.json({ type: 'application/*+json' }))
app.use(cors())

app.post('/create', bpj, async (req, res) => {

  res.set('content-type', 'application/json')
  req.body.ipfs = await pinToIPFS(req.body)
  res.status(201)
  //res.end(JSON.stringify(req.body, null, 2)) //!?
  res.send(req.body)
});

app.get('/key/:id', async (req, res) => {
  const hoo = await fetch('https://gateway.pinata.cloud/ipfs/QmPBvPuiyCDW83UYdLdGHSALuhxN7L8yKXkgT4VRB2vcng')
  res.json(await hoo.json())
  // fetch the ipfs value if it exists
  // if it doesn't do nothing
  // @todo add notes section
  // res.json({something: 'someValue'});
})

const server = app.listen(8081, function () {
  const host = server.address().address
  const port = server.address().port

 console.log("Example app listening at http://%s:%s/", host, port)
})

// const con = mysql.createConnection({
//   host: "localhost",
//   user: process.env.MYSQLDBUSER,
//   password: process.env.MYSQLDBPASS,
//   database: process.env.MYSQLDBNAME
// });

//
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });
