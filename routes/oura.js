var express = require('express');
var router = express.Router();
var cardano = require('@harmoniclabs/cardano-ledger-ts');
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  
  for (var output of req.body.transaction.outputs) { 
    console.log(output);
    let address, base, stake;
    try { 
      address = cardano.Address.fromBech32(output.address);
      console.log(address);
      var stakeKey = address.stakeCreds;
      var network = address.network;
      var stakeAddress = new cardano.StakeAddress(stakeKey, network);
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
