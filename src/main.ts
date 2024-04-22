import { BlockData, assertNotNull } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as pool from "./abi/Pool";
import * as factory from "./abi/Factory";
import * as nonFungiblePositionManager from "./abi/NonFungiblePositionManager";
import * as uniswapV3Staker from "./abi/UniswapV3Staker";
import { Block, Context, contractAddresses, processor } from "./processor";
import { Account, Pool, Position, Reward } from "./model";
import { computeAddress } from "./utils";
// import { computeAddress } from "./utils";

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

          console.log("created pool", pool.id);

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

          // Only interested in new positions
          if (position) continue;

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
            "Missing transaction",
          );

          const pool =
            pools.get(poolAddress.toLowerCase()) ||
            (await ctx.store.findOneByOrFail(Pool, {
              id: poolAddress.toLowerCase(),
            }));

          const owner = await getAccount({ ctx, address: from, accounts });

          position = new Position({
            id: event.tokenId.toString(),
            createdTimestamp: BigInt(block.header.timestamp),
            createdBlock: BigInt(block.header.height),
            owner,
            pool,
          });

          console.log("created position", position.id);

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

          const tx = assertNotNull(log.transaction, "Missing transaction");
          const recipient = assertNotNull(tx.to, "Missing transfer recipient");

          const owner = await getAccount({ ctx, address: recipient, accounts });

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
  let account = await ctx.store.findOne(Account, { where: { id: address } });
  if (!account) {
    account = new Account({ id: address });
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
    contractAddresses.NFT_POSITION_MANAGER,
  );

  const positionData = await nftPosContract.positions(tokenId);

  const poolAddress = computeAddress({
    token0: positionData.token0,
    token1: positionData.token1,
    fee: positionData.fee,
  });

  return poolAddress.toLowerCase();
}
