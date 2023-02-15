import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import * as fs from 'fs';
import { EventEmitter } from 'events';


const BASE = 10000000000;
const MIN_WEIGHT = 10000000000;
const TYPES_FILE = "types.json";
const LOCAL_NODE = "ws://127.0.0.1:9944;" //"wss://bsr.zeitgeist.pm"; // "wss://zeitgeist.api.onfinality.io/public-ws";
const ALICE_KEY =
  "//Alice";
const ALICE = "dE3pPiRvdKqPD5bUDBu3Xpi83McE3Zf3UG8CbhWBQfvUywd7U";
const METADATA =
  "0x1530000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

  async function signAndSend(tx, signer) {
    const bus = new EventEmitter();
    const event = "InBlock";
    let unsub = await tx.signAndSend(signer, (result) => {
      if (result.dispatchError) {
        console.log(`DispatchError: ${result.dispatchError}`);
      }
      if (result.isInBlock) {
        bus.emit(event);
        unsub();
      }
    });
    await new Promise((resolve) => bus.once(event, resolve));
  }
  

async function main() {
  const types = JSON.parse(fs.readFileSync(TYPES_FILE));
  const provider = new WsProvider(LOCAL_NODE);
  const rpc = {
    swaps: {
      getSpotPrice: {
        description: "",
        params: [
          {
            name: "pool_id",
            type: "PoolId",
          },
          {
            name: "asset_in",
            type: "Asset",
          },
          {
            name: "asset_out",
            type: "Asset",
          },
          {
            name: "with_fees",
            type: "bool",
          },
          {
            name: "at",
            type: "Hash",
            isOptional: true,
          },
        ],
        type: "Balance",
      },
    },
  };
  const api = await ApiPromise.create({ provider, types, rpc });
 // console.log(api.rpc);
 const keyring = new Keyring({ type: "sr25519" });
 const alice = keyring.addFromUri(ALICE_KEY);

  // console.log("Creating market...");
  // let tx = api.tx.predictionMarkets.createCpmmMarketAndDeployAssets(
  //   "ztg",
  //   ALICE,
  //   api.createType("MarketPeriod", { Block: [0, 300] }),
  //   api.createType("Deadlines", {
  //     gracePeriod: 0,
  //     oracleDuration: 3000,
  //     disputeDuration: 3600,
  //   }),
  //   api.createType("MultiHash", { Sha3_384: METADATA }),
  //   api.createType("MarketType", { Scalar: [0, 100] }),
  //   "SimpleDisputes",
  //   0,
  //   10000000000000,
  //   [10000000000, 200000000000],
  // );
  // await signAndSend(tx, alice);

  console.log( "Vivek " + 
    await api.rpc.swaps.getSpotPrice(
      1,
      { ScalarOutcome: [0, 'long'] },
      { Ztg: null },
      false,
    )
  );
  process.exit(0);
}

main().catch(console.error);
