var express = require('express');
var router = express.Router();
var cardano = require('@cardano-sdk/core')
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  for (var output of req.body.transaction.outputs) { 
    console.log(output);
    let address, base, stake;
    try { 
      address = cardano.Cardano.Address.fromBech32(output.address);
      base = address.asBase()
      var stakeKey = base.getStakeCredential();
      var stakeAddress = cardano.Cardano.RewardAddress.fromCredentials(address.getNetworkId(), stakeKey);
      //stake = address.asReward().toAddress();
      
      console.log(stakeAddress.toBech32());

      
    } catch (e) { 
      console.log(e)
    }
    
    //
    //console.log(stakeKey);
    //var stakeAddress = cardano.Cardano.RewardAddress.fromCredentials(address.getNetworkId(), stakeKey);
    //console.log(stakeAddress);
    //console.log(output);

  }
  
  res.send('respond with a resource');
});

module.exports = router;
