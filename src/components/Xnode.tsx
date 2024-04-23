import { useConnex, useWallet } from "@vechain/dapp-kit-react";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import xNode1 from "@/assets/xl1.png";
import xNode2 from "@/assets/xl2.png";
import xNode3 from "@/assets/xl3.png";
import xNode4 from "@/assets/xl4.png";
import Loading from "./Loading";
import { X_CONTRACT_ADDRESS } from "@/config";

const xNodeLevel = [
  { image: xNode1, alt: "xNode1", version: "Mjolnir X" },
  { image: xNode2, alt: "xNode2", version: "Thunder X" },
  { image: xNode3, alt: "xNode3", version: "Strength X" },
  { image: xNode4, alt: "xNode4", version: "VeThor X" },
];
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
  const [metadata, setMetadata] = useState<any>(null); // [owner, level, isOnUpgrade, isOnAuction, lastTransferTime, createdAt, updatedAt
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
    } catch (err: any) {
      setErrorMessage(err.message);
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
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const metaByTokenId = async (tokenId: number | null) => {
    try {
      const { decoded: metadata } = await connex.thor
        .account(X_CONTRACT_ADDRESS)
        .method(abiGetMetadata)
        .call(tokenId);
      return metadata;
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    if (!account || !connex) return;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        await isXFunction();
        setMetadata(await metaByTokenId(await tokenIdByAddress()));
      } catch (err: any) {
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [account, connex]);

  useEffect(() => {
    toast({
      variant: "destructive",
      title: "Error!",
      description: errorMessage,
    });
  }, [errorMessage, toast]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading &&
        account &&
        xNode &&
        ((metadata.level === "1" && (
          <div className="flex w-full gap-2 items-center justify-center">
            <img
              src={xNodeLevel[Number(metadata.level) - 1].image}
              alt={xNodeLevel[Number(metadata.level) - 1].alt}
              className="w-6"
            />
            <p>{xNodeLevel[Number(metadata.level) - 1].version}</p>
          </div>
        )) ||
          (metadata.level === "2" && (
            <div className="flex w-full gap-2 items-center justify-center">
              <img
                src={xNodeLevel[Number(metadata.level) - 1].image}
                alt={xNodeLevel[Number(metadata.level) - 1].alt}
                className="w-6"
              />
              <p>{xNodeLevel[Number(metadata.level) - 1].version}</p>
            </div>
          )) ||
          (metadata.level === "3" && (
            <div className="flex w-full gap-2 items-center justify-center">
              <img
                src={xNodeLevel[Number(metadata.level) - 1].image}
                alt={xNodeLevel[Number(metadata.level) - 1].alt}
                className="w-6"
              />
              <p>{xNodeLevel[Number(metadata.level) - 1].version}</p>
            </div>
          )) ||
          (metadata.level === "4" && (
            <div className="flex w-full gap-2 items-center justify-center">
              <img
                src={xNodeLevel[Number(metadata.level) - 1].image}
                alt={xNodeLevel[Number(metadata.level) - 1].alt}
                className="w-6"
              />
              <p>{xNodeLevel[Number(metadata.level) - 1].version}</p>
            </div>
          )))}
    </>
  );
};

export default Xnode;
