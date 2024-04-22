export type BlockchainResult = {
  totalItems: number;
  totalPages: number;
  page: Array<{
    _id: string;
    contractAddress: string;
    tokenId: string;
    metadataUri: string;
    updatedAt: string;
  }>;
};
