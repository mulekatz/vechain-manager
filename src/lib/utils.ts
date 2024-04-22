import { API_URL } from "@/config";
import { BlockchainResult } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateMiddle(text: string | undefined, maxLength = 8) {
  if (text && text.length <= maxLength) {
    return text;
  }
  if (text) {
    const start = text.substring(0, maxLength / 2);
    const end = text.substring(text.length - maxLength / 2, text.length);
    return `${start}...${end}`;
  }
  return null;
}

export async function fetchNftsFromApi(address: string) {
  const response = await fetch(`${API_URL}/nfts?address=${address}`);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function nftList(address: string): Promise<
  {
    _id: string;
    contractAddress: string;
    tokenId: string;
    metadataUri: string;
    updatedAt: string;
  }[]
> {
  try {
    const data: BlockchainResult = await fetchNftsFromApi(address);
    const nfts = data.page.flatMap((page) => page);
    return nfts;
  } catch (error) {
    throw new Error("Could not fetch stakedNfts.");
  }
}
