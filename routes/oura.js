var express = require('express');
var router = express.Router();
var cardano = require('@cardano-sdk/core')
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  for (var output of req.body.transaction.outputs) { 
    var address = cardano.Cardano.Address.fromBech32(output.address);
    console.log(address);
    var stakeKey = address.getStakeCredential();
    console.log(stakeKey);
    var stakeAddress = cardano.Cardano.RewardAddress.fromCredentials(address.getNetworkId(), stakeKey);
    console.log(stakeAddress);
    console.log(output);

  }
  
  res.send('respond with a resource');
});

module.exports = router;
