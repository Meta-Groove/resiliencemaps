const express = require('express');
const app = express();
const bp = require('body-parser');
const bpj = require('body-parser').json();
const  mysql = require('mysql');
require('dotenv').config();

const pinToIPFS  = require('./ipfsStorage')

//@todo update tags to make test content
// wrap where necessary in trys and such

app.use(bp.json({ type: 'application/*+json' }))

app.post('/create', bpj, (req, res) => {

  //res.body(req.body)
  res.set('content-type', 'application/json')

  req.body.ipfsId = pinToIPFS(req.body)
  res.status(201)
  //res.end(JSON.stringify(req.body, null, 2)) //!?
  res.send(req.body)

  // generate a hash that can be stored -- can emulate in advance?
});

app.get('/key/:id', function (req, res) {
  // grab the first element...
  //  only accept from single ip or somehting like thiat
  res.json({something: 'someValue'});
})

const server = app.listen(8081, function () {
  const host = server.address().address
  const port = server.address().port

 console.log("Example app listening at http://%s:%s/", 'localhost', port)
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
