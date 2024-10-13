var express = require('express');
var router = express.Router();
var cardano = require('@harmoniclabs/cardano-ledger-ts');
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body.transaction.mint);
  
  for (var output of req.body.transaction.outputs) { 
    
    let address, base, stake;
    try { 
      address = cardano.Address.fromString(output.address);
      console.log(address);
      var stakeKey = address.stakeCreds;
      console.log(stakeKey);
      var network = address.network;
      var stakeAddress = new cardano.StakeAddress(network, stakeKey.hash);
      //stake = address.asReward().toAddress();
      
      console.log(stakeAddress.toString());

      
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
