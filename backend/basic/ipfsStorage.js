require('dotenv').config();

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK( process.env.PINATAKEY, process.env.PINATASECRET);


const map =  {
  someThing: 'someValue'
}

const body = {
  message: 'Pinatas are awesome'
};
const options = {
  pinataMetadata: {
    name: 'metadataname',
    keyvalues: {
      customKey: 'customValue',
      customKey2: 'customValue2'
    }
  },
  pinataOptions: {
    cidVersion: 0
  }
};

console.log(process.env.PINATAKEY)


pinata.testAuthentication().then((result) => {
  //handle successful authentication here
  console.log(result);
}).catch((err) => {
  //handle error here
  console.log(process.env)
  console.log(err);
});



module.exports = async function pinToIPFS(content) {
  // try catch
  const moo = await pinata.pinJSONToIPFS(content, options)
  console.log('moo', moo)
  return moo
}


// pinata.pinJSONToIPFS(body, options).then((result) => {
//   //handle results here
//   console.log(result);
// }).catch((err) => {
//   //handle error here
//   console.log(err);
// });
