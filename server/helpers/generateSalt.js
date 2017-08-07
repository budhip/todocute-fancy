var crypto = require('crypto');

function genRandomString(length) {
  //cara bawaan dari crypto
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex')
          .slice(0,length);
}

function createHash(password, salt) {
  let hash = crypto.createHmac('sha256', salt).update(password).digest('hex');

  return hash;
}

module.exports = {
  genRandomString,
  createHash
};
