import { assertNotNull } from "@subsquid/util-internal";
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
// import * as Pool from "./abi/Pool";
import * as Factory from "./abi/Factory";
import * as NonFungiblePositionManager from "./abi/NonFungiblePositionManager";
import * as UniswapV3Staker from "./abi/UniswapV3Staker";

export const contractAddresses = {
  FARTHER: "0x65Fb1f9Cb54fF76eBCb40b7F9aa4297B49C3Cf1a".toLowerCase(),
  WETH: "0x4200000000000000000000000000000000000006".toLowerCase(),
  UNISWAP_V3_STAKER: "0x42be4d6527829fefa1493e1fb9f3676d2425c3c1".toLowerCase(),
  UNIV3_FACTORY: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD".toLowerCase(),
  NFT_POSITION_MANAGER:
    "0x03a520b32c04bf3beef7beb72e919cf822ed34f1".toLowerCase(),
  UNIV3_FARTHER_ETH_30BPS_POOL:
    "0x0E59d9301fAc8D2d33Cd56212dFBE20B0d178C5d".toLowerCase(),
} as const;

const START_BLOCK = 13142142;

export const processor = new EvmBatchProcessor()
  // Lookup archive by the network name in Subsquid registry
  // See https://docs.subsquid.io/evm-indexing/supported-networks/
  .setGateway("https://v2.archive.subsquid.io/network/base-mainnet")
  // Chain RPC endpoint is required for
  //  - indexing unfinalized blocks https://docs.subsquid.io/basics/unfinalized-blocks/
  //  - querying the contract state https://docs.subsquid.io/evm-indexing/query-state/
  .setRpcEndpoint({
    // Set the URL via .env for local runs or via secrets when deploying to Subsquid Cloud
    // https://docs.subsquid.io/deploy-squid/env-variables/
    // url: assertNotNull(process.env.RPC_ENDPOINT, "RPC_ENDPOINT is not set"),
    url: assertNotNull(process.env.RPC_BASE_HTTP, "RPC_BASE_HTTP is not set"),
    // More RPC connection options at https://docs.subsquid.io/evm-indexing/configuration/initialization/#set-data-source
    rateLimit: 20,
  })
  .setFinalityConfirmation(75)
  .setFields({
    log: {
      topics: true,
      data: true,
    },
    transaction: {
      hash: true,
      // input: true,
    },
  })
  .addLog({
    address: [contractAddresses.UNIV3_FACTORY],
    topic0: [Factory.events.PoolCreated.topic],
    transaction: true,
  })
  .addLog({
    address: [contractAddresses.NFT_POSITION_MANAGER],
    topic0: [NonFungiblePositionManager.events.IncreaseLiquidity.topic],
    transaction: true,
  })
  // .addLog({
  //   address: [contractAddresses.NFT_POSITION_MANAGER],
  //   topic0: [NonFungiblePositionManager.events.DecreaseLiquidity.topic],
  //   transaction: true,
  // })
  .addLog({
    address: [contractAddresses.NFT_POSITION_MANAGER],
    topic0: [NonFungiblePositionManager.events.Transfer.topic],
    transaction: true,
  })
  .addLog({
    address: [contractAddresses.UNISWAP_V3_STAKER],
    topic0: [UniswapV3Staker.events.TokenStaked.topic],
    transaction: true,
  })
  .addLog({
    address: [contractAddresses.UNISWAP_V3_STAKER],
    topic0: [UniswapV3Staker.events.TokenUnstaked.topic],
    transaction: true,
  })
  .addLog({
    address: [contractAddresses.UNISWAP_V3_STAKER],
    topic0: [UniswapV3Staker.events.RewardClaimed.topic],
    transaction: true,
  })
  // .addLog({
  //   address: [contractAddresses.UNIV3_FARTHER_ETH_30BPS_POOL],
  //   topic0: [Pool.events.Initialize.topic],
  //   transaction: true,
  // })
  // .addLog({
  //   address: [contractAddresses.UNIV3_FARTHER_ETH_30BPS_POOL],
  //   topic0: [Pool.events.Collect.topic],
  //   transaction: true,
  // })
  // .addLog({
  //   address: [contractAddresses.UNIV3_FARTHER_ETH_30BPS_POOL],
  //   topic0: [Pool.events.Swap.topic],
  //   transaction: true,
  // })
  // .addLog({
  //   address: [contractAddresses.UNIV3_FARTHER_ETH_30BPS_POOL],
  //   topic0: [Pool.events.Mint.topic],
  //   transaction: true,
  // })
  // .addLog({
  //   address: [contractAddresses.UNIV3_FARTHER_ETH_30BPS_POOL],
  //   topic0: [Pool.events.Burn.topic],
  //   transaction: true,
  // })
  .setBlockRange({
    from: START_BLOCK,
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
