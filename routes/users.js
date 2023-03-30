var express = require('express');
var router = express.Router();
const knex = require('../knex/knex.js');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  return "Working"
}); 


module.exports = router;
