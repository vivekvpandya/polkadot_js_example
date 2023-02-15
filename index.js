// index.js
import { ApiPromise, WsProvider } from '@polkadot/api';
import { encodeAddress } from '@polkadot/util-crypto';
import { ZeitgeistIpfs, createRpcContext } from '@zeitgeistpm/sdk';

async function getSdk() {
  return createRpcContext({
    provider: "ws://127.0.0.1:9944",
    storage: ZeitgeistIpfs(),
  });
}
const main = async () => {
    const wsProvider = new WsProvider('wss://zeitgeist.api.onfinality.io/public-ws');
    // const wsProvider = new WsProvider('wss://bsr.zeitgeist.pm');
    const sdk = await getSdk();
    let { api } = sdk;
    const accountId = await api.rpc.swaps.poolAccountId("95");
    console.log(accountId);
    
    // const spotPrice = await api.rpc.swaps.getSpotPrice("95", { ScalarOutcome: (119, 0) }, { Ztg: null}, null, false);
      // // Retrieve the balance at the preceding block for Alice using an at api
  // const apiAtBlockA = await api.at('0x2263cb660238ef2864d46ae825d374ec4c8e148ab89b4917a78e40ae67164c5b');
  // const apiAtBlockB = await api.at('0x23777a5dcd22f4f10851676ae5576ceeee9d118c87b7464b1c15eff7f9228f8f');


    // // Adjust how many accounts to query at once.
    // let limit = 1000;
    // let accountsBefore = [];
    // let accountsBeforeCount = 0;
    // let last_key = "";
    // console.log("Getting accounts before.");

    // while (true) {
        
      //   process.stdout.write("downloading accounts data...\r");
      //   let query = await apiAtBlockA.query.system.account.entriesPaged({ args: [], pageSize: limit, startKey: last_key });

      //   if (query.length == 0) {
      //       break
      //   }

      //   for (const user of query) {
      //       let account_id = encodeAddress(user[0].slice(-32));
      //       let free_balance = user[1].data.free;
      //       let reserved_balance = user[1].data.reserved;
      //       let miscFrozen = user[1].data.miscFrozen;
      //       let feeFrozen = user[1].data.feeFrozen;
      //       accountsBefore.push({ account_id, free_balance, reserved_balance, miscFrozen, feeFrozen });
      //       last_key = user[0];
      //       accountsBeforeCount++;
      //   }
    // }
    // let accountsAfter = [];
    // let last_key1 = "";
    // let accountsAfterCount = 0;
    // console.log("Getting accounts after.");

    // while (true) {
        
      //   process.stdout.write("downloading accounts data...\r");
      //   let query = await apiAtBlockA.query.system.account.entriesPaged({ args: [], pageSize: limit, startKey: last_key1 });

      //   if (query.length == 0) {
      //       break
      //   }

      //   for (const user of query) {
      //       let account_id = encodeAddress(user[0].slice(-32));
      //       let free_balance = user[1].data.free;
      //       let reserved_balance = user[1].data.reserved;
      //       let miscFrozen = user[1].data.miscFrozen;
      //       let feeFrozen = user[1].data.feeFrozen;
      //       accountsAfter.push({ account_id, free_balance, reserved_balance, miscFrozen, feeFrozen });
      //       last_key1 = user[0];
      //       accountsAfterCount++;
      //   }
    // }

    // var count = 0;
    // if (accountsAfterCount < accountsBeforeCount) {

      //   console.log(" accountsAfterCount < accountsBeforeCount");
      //   count = accountsAfterCount;
    // } else if (accountsAfterCount > accountsBeforeCount){
      //   console.log(" accountsAfterCount > accountsBeforeCount");
      //   count = accountsBeforeCount;

    // } else {

      //   count = accountsAfterCount;
    // }
  
// process.stdout.write("processing " + count + " accounts ...\r");

// for (var i = 0; i < count; i++) {
// let reserve_difference = accountsAfter[i].reserved_balance - accountsBefore[i].reserved_balance;
// let free_difference = accountsAfter[i].free_balance - accountsBefore[i].free_balance;
// let cond_a = free_difference == reserve_difference;
// let max_misc = Math.max(accountsBefore[i].miscFrozen, reserve_difference);
// let cond_b = accountsAfter[i].miscFrozen == max_misc;
// let max_fee = Math.max(accountsBefore[i].feeFrozen, reserve_difference);
// let cond_c = accountsAfter[i].feeFrozen == max_fee;
// let max_misc_fee = Math.max(accountsAfter[i].miscFrozen, accountsAfter[i].feeFrozen);
// let cond_d = accountsAfter[i].free > max_misc_fee;

// if (cond_a || cond_b || cond_c || cond_d) {
// let res = "" + accountsAfter[i].account_id 
// + cond_a ? "cond_a" : "" 
// + cond_b ? "cond_b" : "" 
// + cond_c ?  "cond_c" : ""
 // + cond_d ? "cond_d" : "";
// console.log(res);
// }

// }


};

main().then({

}).catch((err) => {
    console.error(err)
}).finally(() => process.exit());
