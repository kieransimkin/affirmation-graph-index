var express = require('express');
var router = express.Router();
var cardano = require('@harmoniclabs/cardano-ledger-ts');
var neo4j = require('../neo4j.js')
/* GET users listing. */
router.post('/', async function(req, res, next) {
  const driver = await neo4j.getDriver();
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
          var hash = new cardano.Hash28(mint.asset);
          console.log(hash);
          source = new cardano.StakeAddress(network, hash ).toString();
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
    const r1 = await driver.executeQuery(`
      MERGE (s:Wallet {stake: $source})
      MERGE (t:Wallet {stake: $target})
      MERGE (s)-[:AFFIRMS {txHash: $txHash }]->(t)
      `,
       { source,target, txHash: req.body.transaction.hash },
       { database: 'neo4j' }
    )
    console.log(r1);
  } else { 
    console.log(req.body.transaction.outputs);
    for (var input of req.body.transaction.inputs) { 
      console.log(input);
    }
  } 
  res.send('respond with a resource');
});

module.exports = router;
