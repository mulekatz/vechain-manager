import { useConnex, useWallet } from "@vechain/dapp-kit-react";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import Loading from "./Loading";
import { X_CONTRACT_ADDRESS } from "@/config";
import { NftXMetadata } from "@/types/types";
import XNodeImage from "./XNodeImage";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const abiIsX = {
  constant: true,
  inputs: [
    {
      name: "_target",
      type: "address",
    },
  ],
  name: "isX",
  outputs: [
    {
      name: " ",
      type: "bool",
    },
  ],
  payable: false,
  stateMutability: "view",
  type: "function",
};
const abiOwnerToId = {
  constant: true,
  inputs: [{ name: "", type: "address" }],
  name: "ownerToId",
  outputs: [{ name: "tokenId", type: "uint256" }],
  payable: false,
  stateMutability: "view",
  type: "function",
};
const abiGetMetadata = {
  constant: true,
  inputs: [{ name: "_tokenId", type: "uint256" }],
  name: "getMetadata",
  outputs: [
    { name: "owner", type: "address" },
    { name: "level", type: "uint8" },
    { name: "isOnUpgrade", type: "bool" },
    { name: "isOnAuction", type: "bool" },
    { name: "lastTransferTime", type: "uint64" },
    { name: "createdAt", type: "uint64" },
    { name: "updatedAt", type: "uint64" },
  ],
  payable: false,
  stateMutability: "view",
  type: "function",
};

const Xnode = () => {
  const connex = useConnex();
  const { account } = useWallet();
  const { toast } = useToast();
  const [xNode, setXNode] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<NftXMetadata | null>(null); // [owner, level, isOnUpgrade, isOnAuction, lastTransferTime, createdAt, updatedAt
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isXFunction = async () => {
    try {
      const {
        decoded: { 0: isX },
      } = await connex.thor
        .account(X_CONTRACT_ADDRESS)
        .method(abiIsX)
        .call(account);
      setXNode(isX);
    } catch (err) {
      if (typeof err === "string") {
        setErrorMessage(err);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  const tokenIdByAddress = async () => {
    try {
      const {
        decoded: { 0: tokenId },
      } = await connex.thor
        .account(X_CONTRACT_ADDRESS)
        .method(abiOwnerToId)
        .call(account);
      return tokenId;
    } catch (err) {
      if (typeof err === "string") {
        setErrorMessage(err);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  const metaByTokenId = async (tokenId: number | null) => {
    try {
      const { decoded: metadata } = await connex.thor
        .account(X_CONTRACT_ADDRESS)
        .method(abiGetMetadata)
        .call(tokenId);
      return metadata;
    } catch (err) {
      if (typeof err === "string") {
        setErrorMessage(err);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  useEffect(() => {
    if (!account || !connex) return;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await isXFunction();
        setMetadata(await metaByTokenId(await tokenIdByAddress()));
      } catch (err) {
        console.error("!");
        if (typeof err === "string") {
          setErrorMessage(err);
        } else if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [account, connex]);

  useEffect(() => {
    if (errorMessage) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: errorMessage,
      });
    }
  }, [errorMessage, toast]);

  if (!xNode) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="items-center justify-center gap-1 p-2">
        <CardTitle className="text-center">NODE STATUS</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {isLoading && <Loading />}
        {!isLoading && account && xNode && metadata && (
          <XNodeImage level={metadata.level} />
        )}
      </CardContent>
    </Card>
  );
};

export default Xnode;
