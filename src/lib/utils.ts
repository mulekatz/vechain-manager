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
  const data: BlockchainResult = await fetchNftsFromApi(address);
  if (!data.page) {
    throw new Error("No NFTs found for this address.");
  }
  const nfts = data.page.flatMap((page) => page);
  return nfts;
}

export async function fetchNftMetadata(metadataUri: string) {
  if (metadataUri.includes("ar://")) {
    const arUri = metadataUri.replace("ar://", "https://arweave.net/");
    const response = await fetch(arUri);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata from ${metadataUri}`);
    }
    const data = await response.json();
    data.image = data.image.replace("ar://", "https://arweave.net/");
    return data;
  }
  if (metadataUri.includes("ipfs://")) {
    const ipfsUri = metadataUri.replace("ipfs://", "https://ipfs.io/ipfs/");
    const response = await fetch(ipfsUri);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata from ${metadataUri}`);
    }
    const data = await response.json();
    data.image = data.image.replace("ipfs://", "https://ipfs.io/ipfs/");
    console.log("ipfs: ", data);
    return data;
  }
  if (metadataUri.includes("https://")) {
    const response = await fetch(metadataUri);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata from ${metadataUri}`);
    }
    const data = await response.json();
    console.log("https: ", data);
    return data;
  }
  throw new Error(`Unsupported metadata URI: ${metadataUri}`);
}
