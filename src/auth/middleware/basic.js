'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('Invalid login'); }

  let basic = req.headers.authorization.split(' ')[1];
  let [username, pass] = base64.decode(basic).split(':');
  try {
    req.user = await users.authenticateBasic(username, pass)
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

}

