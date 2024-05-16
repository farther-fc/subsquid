require("dotenv").config();

if (
  process.env.ENVIRONMENT !== "production" &&
  process.env.ENVIRONMENT !== "staging"
) {
  throw new Error("ENVIRONMENT must be set to 'production' or 'staging'");
}

export const ENVIRONMENT = process.env.ENVIRONMENT;

export const contractAddresses = {
  FARTHER:
    ENVIRONMENT === "staging"
      ? "0xf9A98fDC95A427fCfB1506A6E8A3143119417fBA".toLowerCase()
      : "0x8ad5b9007556749DE59E088c88801a3Aaa87134B".toLowerCase(),
  UNISWAP_V3_STAKER: "0x42be4d6527829fefa1493e1fb9f3676d2425c3c1".toLowerCase(),
  UNIV3_FACTORY: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD".toLowerCase(),
  NFT_POSITION_MANAGER:
    "0x03a520b32c04bf3beef7beb72e919cf822ed34f1".toLowerCase(),
  UNIV3_FARTHER_ETH_30BPS_POOL:
    ENVIRONMENT === "staging"
      ? "0x2453274556565Eb7c2f2411673b0301D2570e6Cf".toLowerCase()
      : "0x306e600e33A9c86B91EeA5A14c8C73F8de62AC84".toLowerCase(),
} as const;
