import {
  AbiCoder,
  getAddress,
  keccak256,
  solidityPackedKeccak256,
} from "ethers";
import { contractAddresses } from "./constants";

const abiCoder = AbiCoder.defaultAbiCoder();

interface PoolKey {
  token0: string;
  token1: string;
  fee: number;
}

const POOL_INIT_CODE_HASH =
  "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54";

export function computeAddress(key: PoolKey): string {
  // Validate that token0 is less than token1
  if (BigInt(key.token0) > BigInt(key.token1)) {
    throw new Error("token0 should be less than token1");
  }

  // Encode and hash the inner key values
  const innerKeyHash = keccak256(
    abiCoder.encode(
      ["address", "address", "uint24"],
      [key.token0, key.token1, key.fee]
    )
  );

  // Create pseudo-random salt and encode packed
  const encodedPacked = solidityPackedKeccak256(
    ["bytes1", "address", "bytes32", "bytes32"],
    ["0xff", contractAddresses.UNIV3_FACTORY, innerKeyHash, POOL_INIT_CODE_HASH]
  );

  // Compute the address by taking the last 20 bytes of the hash of the encoded data
  const address = `0x${encodedPacked.slice(-40)}`;
  return getAddress(address);
}
