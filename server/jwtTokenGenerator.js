let jwt = require('jsonwebtoken');

function generateAuthToken(data) {
  data = JSON.stringify(data);
  let token = jwt.sign(data, 'qwertyasdfgh');//same work as salt 

  return token;
}

module.exports = generateAuthToken;