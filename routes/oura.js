var express = require('express');
var router = express.Router();
var cardano = require('@cardano-sdk/core')
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  for (var output of req.body.transaction.outputs) { 
    cardano.Cardano.Address.fromBech32(output.address)
  }
  
  res.send('respond with a resource');
});

module.exports = router;
