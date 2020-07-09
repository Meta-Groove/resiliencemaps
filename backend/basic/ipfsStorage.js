require('dotenv').config();

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK( process.env.PINATAKEY, process.env.PINATASECRET);


const options = {
  pinataMetadata: {
    name: 'testContentName',
    keyValues: {
      version: 'test',
      customKey2: 'customValue2'
    }
  },
  pinataOptions: {
    cidVersion: 0
  }
};

module.exports = async function pinToIPFS(content) {
  // try catch
  const moo = await pinata.pinJSONToIPFS(content, options)
  console.log('moo', moo)
  return moo
}
