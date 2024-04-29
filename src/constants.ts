if (
  process.env.ENVIRONMENT !== "production" &&
  process.env.ENVIRONMENT !== "staging"
) {
  throw new Error("ENVIRONMENT must be set to 'production' or 'staging'");
}

export const ENVIRONMENT = process.env.ENVIRONMENT;

const baseContractAddresses = {
  production: {
    FARTHER: "0xTODO".toLowerCase(),
    WETH: "0x4200000000000000000000000000000000000006".toLowerCase(),
    UNISWAP_V3_STAKER:
      "0x42be4d6527829fefa1493e1fb9f3676d2425c3c1".toLowerCase(),
    UNIV3_FACTORY: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD".toLowerCase(),
    NFT_POSITION_MANAGER:
      "0x03a520b32c04bf3beef7beb72e919cf822ed34f1".toLowerCase(),
    UNIV3_FARTHER_ETH_30BPS_POOL: "0x".toLowerCase(),
  },
  staging: {
    FARTHER: "0x5b69Edb2434b47978D608fD1CEa375A9Ed04Aa18".toLowerCase(),
    WETH: "0x4200000000000000000000000000000000000006".toLowerCase(),
    UNISWAP_V3_STAKER:
      "0x42be4d6527829fefa1493e1fb9f3676d2425c3c1".toLowerCase(),
    UNIV3_FACTORY: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD".toLowerCase(),
    NFT_POSITION_MANAGER:
      "0x03a520b32c04bf3beef7beb72e919cf822ed34f1".toLowerCase(),
    UNIV3_FARTHER_ETH_30BPS_POOL:
      "0xC17Ff8380c09685B2A671E8076c98E5F2eC56832".toLowerCase(),
  },
} as const;

export const contractAddresses = baseContractAddresses[ENVIRONMENT];
