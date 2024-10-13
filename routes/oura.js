var express = require('express');
var router = express.Router();
var cardano = require('@harmoniclabs/cardano-ledger-ts');
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body.transaction.mint);
  let target;
  let source;
  let mint = req.body.transaction.mint[0];
  if (mint.quantity==1) { 
    
    for (var output of req.body.transaction.outputs) { 
      
      let address, base, stake;
      try { 
        address = cardano.Address.fromString(output.address);
        console.log(address);
        var stakeKey = address?.stakeCreds;
        if (!stakeKey) continue;
        console.log(stakeKey);
        var network = address.network;
        var stakeAddress = new cardano.StakeAddress(network, stakeKey.hash);

        //stake = address.asReward().toAddress();
        if (stakeAddress) {
          target=stakeAddress.toString();
          source = new cardano.StakeAddress(network, mint.asset ).toString();
          break;
        }
        

        
      } catch (e) { 
        console.log(e)
      }
      
      //
      //console.log(stakeKey);
      //var stakeAddress = cardano.Cardano.RewardAddress.fromCredentials(address.getNetworkId(), stakeKey);
      //console.log(stakeAddress);
      //console.log(output);

    }
    console.log([target,source])
  } else { 
    for (var input of req.body.transaction.inputs) { 
      console.log(input);
    }
  } 
  res.send('respond with a resource');
});

module.exports = router;
