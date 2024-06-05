import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
import { Store } from "@subsquid/typeorm-store";
import { assertNotNull } from "@subsquid/util-internal";
// import * as Pool from "./abi/Pool";
import * as Factory from "./abi/Factory";
import * as NonFungiblePositionManager from "./abi/NonFungiblePositionManager";
import * as UniswapV3Staker from "./abi/UniswapV3Staker";
import { ENVIRONMENT, contractAddresses } from "./constants";

const START_BLOCK = ENVIRONMENT === "staging" ? 14521125 : 13832035;

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
      input: true,
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
  .addLog({
    address: [contractAddresses.NFT_POSITION_MANAGER],
    topic0: [NonFungiblePositionManager.events.DecreaseLiquidity.topic],
    transaction: true,
  })
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
  .setBlockRange({
    from: START_BLOCK,
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Context = DataHandlerContext<Store, Fields>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
