require("dotenv").config();

if (
  process.env.ENVIRONMENT !== "production" &&
  process.env.ENVIRONMENT !== "staging"
) {
  throw new Error("ENVIRONMENT must be set to 'production' or 'staging'");
}

export const ENVIRONMENT = process.env.ENVIRONMENT;

export const contractAddresses = {
  UNISWAP_V3_STAKER: "0x42be4d6527829fefa1493e1fb9f3676d2425c3c1".toLowerCase(),
  UNIV3_FACTORY: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD".toLowerCase(),
  NFT_POSITION_MANAGER:
    "0x03a520b32c04bf3beef7beb72e919cf822ed34f1".toLowerCase(),
  UNIV3_FARTHER_ETH_30BPS_POOL:
    ENVIRONMENT === "staging"
      ? "0xC17Ff8380c09685B2A671E8076c98E5F2eC56832"
      : "0x306e600e33A9c86B91EeA5A14c8C73F8de62AC84",
} as const;
