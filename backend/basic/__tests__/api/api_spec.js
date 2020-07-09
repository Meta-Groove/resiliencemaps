const frisby = require('frisby');

const urlBase = 'localhost:8081';
const httpMode = 'http';

it('Should post a new object', (done) => {

  const req = {
    method: "post",
    url: httpMode + "://" + urlBase + "/create",
    headers : {
      "Accept": "application/json",
      "content-type" : "application/json",
    },
    body: {
      someThing: 'someValue',
      someOtherThing: 'someOtherValue'
    }
  };

  return frisby.post(req.url, {body: req.body}, {json: true})
    .expect("status", 201)
    .expect("header", "content-type", 'application/json; charset=utf-8')
    .then((res) => {
      console.log('response: ', res)
    })
    .done(done)
}, 9999999);


it('Should get an object', (done) => {
  const req = {
    url: httpMode + "://" + urlBase + "/key/Qm",
  };

  return frisby
    .get(req.url)
    .expect('status', 200)
    .then(res => {
      console.log('get sent res: ', res)
    })
    .done(done)
}, 99999999);
