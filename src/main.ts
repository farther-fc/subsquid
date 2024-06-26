import { BlockData, assertNotNull } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import { decodeFunctionData } from "viem";
import * as factory from "./abi/Factory";
import * as nonFungiblePositionManager from "./abi/NonFungiblePositionManager";
import * as uniswapV3Staker from "./abi/UniswapV3Staker";
import { contractAddresses } from "./constants";
import { Account, Pool, Position } from "./model";
import { Context, processor } from "./processor";
import { computeAddress } from "./utils";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const pools: Map<string, Pool> = new Map();
  const accounts: Map<string, Account> = new Map();
  const positions: Map<string, Position> = new Map();

  console.log("block height", ctx.blocks[0].header.height);

  // Process PoolCreated events
  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      switch (log.topics[0]) {
        case factory.events.PoolCreated.topic: {
          const event = factory.events.PoolCreated.decode(log);

          if (
            event.pool.toLowerCase() !==
            contractAddresses.UNIV3_FARTHER_ETH_30BPS_POOL
          ) {
            continue;
          }

          const pool = new Pool({
            id: event.pool.toLowerCase(),
            createdTimestamp: BigInt(block.header.timestamp),
            createdBlock: BigInt(block.header.height),
          });

          console.log("Created FARTHER pool", pool.id);

          pools.set(event.pool.toLowerCase(), pool);
          break;
        }
        case nonFungiblePositionManager.events.IncreaseLiquidity.topic: {
          const event =
            nonFungiblePositionManager.events.IncreaseLiquidity.decode(log);

          let position =
            positions.get(event.tokenId.toString()) ||
            (await ctx.store.findOne(Position, {
              where: { id: event.tokenId.toString() },
            }));

          if (position) {
            position.liquidity = event.liquidity + position.liquidity;
            position.amount0 = event.amount0;
            position.amount1 = event.amount1;
            continue;
          }

          const poolAddress = await getPoolAddress({
            ctx,
            tokenId: event.tokenId,
            block,
          });

          if (poolAddress !== contractAddresses.UNIV3_FARTHER_ETH_30BPS_POOL) {
            continue;
          }

          const { from } = assertNotNull(
            log.transaction,
            "Missing transaction"
          );

          const pool =
            pools.get(poolAddress.toLowerCase()) ||
            (await ctx.store.findOneByOrFail(Pool, {
              id: poolAddress.toLowerCase(),
            }));

          const owner = await getAccount({
            ctx,
            address: from.toLowerCase(),
            accounts,
          });

          position = new Position({
            id: event.tokenId.toString(),
            createdTimestamp: BigInt(block.header.timestamp),
            createdBlock: BigInt(block.header.height),
            liquidity: event.liquidity,
            amount0: event.amount0,
            amount1: event.amount1,
            owner,
            pool,
          });

          console.log("created position", position.id);

          positions.set(event.tokenId.toString(), position);
          break;
        }
        case nonFungiblePositionManager.events.DecreaseLiquidity.topic: {
          const event =
            nonFungiblePositionManager.events.DecreaseLiquidity.decode(log);

          const position =
            positions.get(event.tokenId.toString()) ||
            (await ctx.store.findOne(Position, {
              where: { id: event.tokenId.toString() },
            }));

          if (!position) {
            continue;
          }

          position.liquidity = event.liquidity - position.liquidity;
          position.amount0 = event.amount0;
          position.amount1 = event.amount1;

          console.log("Decreased liquidity", position.id);
          positions.set(event.tokenId.toString(), position);
          break;
        }
        case nonFungiblePositionManager.events.Transfer.topic: {
          const event = nonFungiblePositionManager.events.Transfer.decode(log);

          let position =
            positions.get(event.tokenId.toString()) ||
            (await ctx.store.findOne(Position, {
              where: { id: event.tokenId.toString() },
            }));

          if (!position) {
            continue;
          }

          const to = assertNotNull(event.to, "Missing recipient");
          const from = assertNotNull(event.from, "Missing sender");

          if (from.toLowerCase() === contractAddresses.UNISWAP_V3_STAKER) {
            position.isHeldByStaker = false;
          }

          if (to.toLowerCase() === contractAddresses.UNISWAP_V3_STAKER) {
            // Ignore transfers to the staker contract
            continue;
          }

          const owner = await getAccount({
            ctx,
            address: to.toLowerCase(),
            accounts,
          });

          position.owner = owner;

          console.log("tokenId transfer", position.id);

          positions.set(event.tokenId.toString(), position);
          break;
        }
        case uniswapV3Staker.events.TokenStaked.topic: {
          const event = uniswapV3Staker.events.TokenStaked.decode(log);

          const tokenId = event.tokenId.toString();

          const position =
            positions.get(tokenId) ||
            (await ctx.store.findOne(Position, { where: { id: tokenId } }));

          if (!position) continue;

          position.isStaked = true;
          position.isHeldByStaker = true;

          console.log("tokenId staked", position.id);

          positions.set(event.tokenId.toString(), position);
          break;
        }
        case uniswapV3Staker.events.TokenUnstaked.topic: {
          const event = uniswapV3Staker.events.TokenUnstaked.decode(log);

          const tokenId = event.tokenId.toString();

          const position =
            positions.get(tokenId) ||
            (await ctx.store.findOne(Position, { where: { id: tokenId } }));

          if (!position) continue;

          position.isStaked = false;

          console.log("tokenId unstaked", position.id);

          positions.set(event.tokenId.toString(), position);
          break;
        }
        case uniswapV3Staker.events.RewardClaimed.topic: {
          const event = uniswapV3Staker.events.RewardClaimed.decode(log);

          const { to, reward } = event;

          const input = log.transaction?.input;

          if (!input) {
            throw new Error(
              "Missing transaction input for RewardClaimed event"
            );
          }

          const { functionName, args } = decodeFunctionData({
            abi: uniswapV3Staker.abi.fragments,
            data: input as `0x${string}`,
          });

          // Ignore any calls that aren't claimReward
          if (functionName !== "claimReward") {
            continue;
          }

          if (!args) {
            throw new Error("Failed to decode function data");
          }

          const [rewardTokenAddress] = args;

          if (typeof rewardTokenAddress !== "string") {
            throw new Error(
              `rewardTokenAddress is not a string: ${rewardTokenAddress}`
            );
          }

          // We only care about FARTHER claims
          if (rewardTokenAddress.toLowerCase() !== contractAddresses.FARTHER) {
            continue;
          }

          console.log("Reward claimed", reward.toString());

          const account = await getAccount({
            ctx,
            address: to.toLowerCase(),
            accounts,
          });

          account.rewardsClaimed =
            (account.rewardsClaimed || BigInt(0)) + reward;

          accounts.set(account.id, account);
          break;
        }
      }
    }
  }

  const poolsBatch = [...pools.values()];
  const accountsBatch = [...accounts.values()];
  const positionsBatch = [...positions.values()];

  if (poolsBatch.length) {
    console.log("Inserting pools", poolsBatch.length);
    await ctx.store.upsert(poolsBatch);
  }

  if (accountsBatch.length) {
    console.log("Inserting accounts", accountsBatch.length);
    await ctx.store.upsert(accountsBatch);
  }

  if (positionsBatch.length) {
    console.log("Inserting positions", positionsBatch.length);
    await ctx.store.upsert(positionsBatch);
  }
});

async function getAccount({
  ctx,
  address,
  accounts,
}: {
  ctx: Context;
  address: string;
  accounts: Map<string, Account>;
}) {
  let account =
    accounts.get(address.toLowerCase()) ||
    (await ctx.store.findOne(Account, {
      where: { id: address.toLowerCase() },
    }));
  if (!account) {
    account = new Account({ id: address.toLowerCase() });
    accounts.set(address.toLowerCase(), account);
  }
  return account;
}

async function getPoolAddress({
  ctx,
  block,
  tokenId,
}: {
  ctx: Context;
  block: BlockData;
  tokenId: bigint;
}) {
  const nftPosContract = new nonFungiblePositionManager.Contract(
    ctx,
    block.header,
    contractAddresses.NFT_POSITION_MANAGER
  );

  const positionData = await nftPosContract.positions(tokenId);

  const poolAddress = computeAddress({
    token0: positionData.token0,
    token1: positionData.token1,
    fee: positionData.fee,
  });

  return poolAddress.toLowerCase();
}
