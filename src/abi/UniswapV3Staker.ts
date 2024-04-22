import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './UniswapV3Staker.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    DepositTransferred: new LogEvent<([tokenId: bigint, oldOwner: string, newOwner: string] & {tokenId: bigint, oldOwner: string, newOwner: string})>(
        abi, '0xcdfc765b85e1048bee3c6a0f9d1c91fc7c4631f5fe5745a55fc6843db5c3260f'
    ),
    IncentiveCreated: new LogEvent<([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string, reward: bigint] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string, reward: bigint})>(
        abi, '0xa876344e28d4b5191ad03bc0d43f740e3695827ab0faccac739930b915ef8b02'
    ),
    IncentiveEnded: new LogEvent<([incentiveId: string, refund: bigint] & {incentiveId: string, refund: bigint})>(
        abi, '0x65124e6175aa9904f40735e87e2a37c76e87a609b855287bb4d1aba8257d9763'
    ),
    RewardClaimed: new LogEvent<([to: string, reward: bigint] & {to: string, reward: bigint})>(
        abi, '0x106f923f993c2149d49b4255ff723acafa1f2d94393f561d3eda32ae348f7241'
    ),
    TokenStaked: new LogEvent<([tokenId: bigint, incentiveId: string, liquidity: bigint] & {tokenId: bigint, incentiveId: string, liquidity: bigint})>(
        abi, '0x3fe90ccd0a34e28f2b4b7a1e8323415ed9dd595f4eec5dfd461d18c2df336dbd'
    ),
    TokenUnstaked: new LogEvent<([tokenId: bigint, incentiveId: string] & {tokenId: bigint, incentiveId: string})>(
        abi, '0xe1ba67e807ae0efa0a9549f9520ddc15c27f0a4dae2bc045e800ca66a940778f'
    ),
}

export const functions = {
    claimReward: new Func<[rewardToken: string, to: string, amountRequested: bigint], {rewardToken: string, to: string, amountRequested: bigint}, bigint>(
        abi, '0x2f2d783d'
    ),
    createIncentive: new Func<[key: ([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string}), reward: bigint], {key: ([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string}), reward: bigint}, []>(
        abi, '0x5cc5e3d9'
    ),
    deposits: new Func<[_: bigint], {}, ([owner: string, numberOfStakes: number, tickLower: number, tickUpper: number] & {owner: string, numberOfStakes: number, tickLower: number, tickUpper: number})>(
        abi, '0xb02c43d0'
    ),
    endIncentive: new Func<[key: ([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string})], {key: ([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string})}, bigint>(
        abi, '0xb5ada6e4'
    ),
    factory: new Func<[], {}, string>(
        abi, '0xc45a0155'
    ),
    getRewardInfo: new Func<[key: ([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string}), tokenId: bigint], {key: ([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string}), tokenId: bigint}, ([reward: bigint, secondsInsideX128: bigint] & {reward: bigint, secondsInsideX128: bigint})>(
        abi, '0xd953186e'
    ),
    incentives: new Func<[_: string], {}, ([totalRewardUnclaimed: bigint, totalSecondsClaimedX128: bigint, numberOfStakes: bigint] & {totalRewardUnclaimed: bigint, totalSecondsClaimedX128: bigint, numberOfStakes: bigint})>(
        abi, '0x60777795'
    ),
    maxIncentiveDuration: new Func<[], {}, bigint>(
        abi, '0x3dc0714b'
    ),
    maxIncentiveStartLeadTime: new Func<[], {}, bigint>(
        abi, '0x01b75440'
    ),
    multicall: new Func<[data: Array<string>], {data: Array<string>}, Array<string>>(
        abi, '0xac9650d8'
    ),
    nonfungiblePositionManager: new Func<[], {}, string>(
        abi, '0xb44a2722'
    ),
    onERC721Received: new Func<[_: string, from: string, tokenId: bigint, data: string], {from: string, tokenId: bigint, data: string}, string>(
        abi, '0x150b7a02'
    ),
    rewards: new Func<[_: string, _: string], {}, bigint>(
        abi, '0xe70b9e27'
    ),
    stakeToken: new Func<[key: ([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string}), tokenId: bigint], {key: ([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string}), tokenId: bigint}, []>(
        abi, '0xf2d2909b'
    ),
    stakes: new Func<[tokenId: bigint, incentiveId: string], {tokenId: bigint, incentiveId: string}, ([secondsPerLiquidityInsideInitialX128: bigint, liquidity: bigint] & {secondsPerLiquidityInsideInitialX128: bigint, liquidity: bigint})>(
        abi, '0xc36c1ea5'
    ),
    transferDeposit: new Func<[tokenId: bigint, to: string], {tokenId: bigint, to: string}, []>(
        abi, '0x26bfee04'
    ),
    unstakeToken: new Func<[key: ([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string}), tokenId: bigint], {key: ([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string}), tokenId: bigint}, []>(
        abi, '0xf549ab42'
    ),
    withdrawToken: new Func<[tokenId: bigint, to: string, data: string], {tokenId: bigint, to: string, data: string}, []>(
        abi, '0x3c423f0b'
    ),
}

export class Contract extends ContractBase {

    deposits(arg0: bigint): Promise<([owner: string, numberOfStakes: number, tickLower: number, tickUpper: number] & {owner: string, numberOfStakes: number, tickLower: number, tickUpper: number})> {
        return this.eth_call(functions.deposits, [arg0])
    }

    factory(): Promise<string> {
        return this.eth_call(functions.factory, [])
    }

    getRewardInfo(key: ([rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string] & {rewardToken: string, pool: string, startTime: bigint, endTime: bigint, refundee: string}), tokenId: bigint): Promise<([reward: bigint, secondsInsideX128: bigint] & {reward: bigint, secondsInsideX128: bigint})> {
        return this.eth_call(functions.getRewardInfo, [key, tokenId])
    }

    incentives(arg0: string): Promise<([totalRewardUnclaimed: bigint, totalSecondsClaimedX128: bigint, numberOfStakes: bigint] & {totalRewardUnclaimed: bigint, totalSecondsClaimedX128: bigint, numberOfStakes: bigint})> {
        return this.eth_call(functions.incentives, [arg0])
    }

    maxIncentiveDuration(): Promise<bigint> {
        return this.eth_call(functions.maxIncentiveDuration, [])
    }

    maxIncentiveStartLeadTime(): Promise<bigint> {
        return this.eth_call(functions.maxIncentiveStartLeadTime, [])
    }

    nonfungiblePositionManager(): Promise<string> {
        return this.eth_call(functions.nonfungiblePositionManager, [])
    }

    rewards(arg0: string, arg1: string): Promise<bigint> {
        return this.eth_call(functions.rewards, [arg0, arg1])
    }

    stakes(tokenId: bigint, incentiveId: string): Promise<([secondsPerLiquidityInsideInitialX128: bigint, liquidity: bigint] & {secondsPerLiquidityInsideInitialX128: bigint, liquidity: bigint})> {
        return this.eth_call(functions.stakes, [tokenId, incentiveId])
    }
}
