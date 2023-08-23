import { type PublicClient } from "wagmi";
import { erc20ABI } from "wagmi";
import { getContract } from "viem";
import { sukukAbi } from "./abi";

export const getSukukWISLMContract = ({
  publicClient,
}: {
  publicClient: PublicClient;
}) => {
  const contract = getContract({
    address: "0xe3Ff113fdE2A569E59FF5fdA65e3cE83D5C2Ee7D",
    abi: sukukAbi,
    publicClient,
  });
  return contract;
};

export const getWISLMERC20Contract = ({
  publicClient,
}: {
  publicClient: PublicClient;
}) => {
  const contract = getContract({
    address: "0xC07C3994eE7CEa9De35f06f548d242009CE2108D",
    abi: erc20ABI,
    publicClient,
  });
  return contract;
};

export const getSukukGoldContract = ({
  publicClient,
}: {
  publicClient: PublicClient;
}) => {
  const contract = getContract({
    address: "0x4ed5777a2c42761d3b28e9547D4205D3E13Ce531",
    abi: sukukAbi,
    publicClient,
  });
  return contract;
};

export const getWGOLDERC20Contract = ({
  publicClient,
}: {
  publicClient: PublicClient;
}) => {
  const contract = getContract({
    address: "0xd81a414F1e73194d2c288057FAa139A8076a806f",
    abi: erc20ABI,
    publicClient,
  });
  return contract;
};
