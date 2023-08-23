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
    address: "0x5d7C85844C5649FF16A2Bba3850675d9E3E678d0",
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
    address: "0x9cd442ABA47008edA5bF6A49c6115AeD5aFFfAdC",
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
