const express = require('express');
const app = express();
const bp = require('body-parser');
const  mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQLDBUSER,
  password: process.env.MYSQLDBPASS,
  database: process.env.MYSQLDBNAME
});

app.use(bp.json({ type: 'application/*+json' }))

app.use('/key/:id', function (req, res, next) {
  //check formation of object
  //res.send('ahoy+'+ req.params.id)
  // write to db
  console.log(req.body)

  // check integrity of data against key
  // chuck it in the db as text
  next();
});

app.get('/', function (req, res) {
  // grab the first element...
  //  only accept from single ip or somehting like thiat
  res.send('Hello World. You are probable here because a URL broken. Try visiting...@tdoo');
})

const server = app.listen(8081, function () {
  const host = server.address().address
  const port = server.address().port

 console.log("Example app listening at http://%s:%s", 'localhost', port)
})

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
