const express = require('express');
const app = express();
const bp = require('body-parser');

app.use('/key/:id', function (req, res, next) {
  //check formation of object
  //add to db
  console.log(req)
  res.send('ahoy')
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

 console.log("Example app listening at http://%s:%s", host, port)
})
