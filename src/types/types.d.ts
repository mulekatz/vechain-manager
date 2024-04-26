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

export type NftMetadata = {
  image: string;
  name: string;
};

export type NftXMetadata = {
  level: string;
};

export type TickerHead = {
  id: string;
  number: number;
  parentID: string;
  timestamp: number;
  txsFeatures: number;
  gasLimit: number;
};

export type Block = {
  number: number;
  id: string;
  size: number;
  parentID: string;
  timestamp: number;
  gasLimit: number;
  beneficiary: string;
  gasUsed: number;
  totalScore: number;
  txsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  signer: string;
  isTrunk: boolean;
  transactions: Array<{
    origin: string;
    gas: number;
    gasPriceCoef: number;
    nonce: number;
    dependsOn: string;
    size: number;
    clauses: [];
  }>;
};
