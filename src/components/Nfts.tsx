import { useEffect, useState } from "react";
import { BlockchainResult, NftMetadata } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useWallet } from "@vechain/dapp-kit-react";
import { fetchNftMetadata, nftList } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import Loading from "./Loading";

const Nfts = () => {
  const { account } = useWallet();
  const { toast } = useToast();
  const [nfts, setNfts] = useState<BlockchainResult["page"]>([]);
  const [metadata, setMetadata] = useState<NftMetadata[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!account) {
      setNfts([]);
      setMetadata([]);
      return;
    }
    setIsLoading(true);
    async function getNfts(address: string) {
      try {
        const nfts = await nftList(address);
        setNfts(nfts);
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
    }
    getNfts(account);
  }, [account]);

  useEffect(() => {
    if (!nfts) {
      return;
    }
    setIsLoading(true);
    setMetadata([]); // Clear the metadata state
    Promise.all(
      nfts.map(async (nft) => {
        try {
          const data = await fetchNftMetadata(nft.metadataUri);
          if (!data) {
            return;
          }
          setMetadata((prev) => [...prev, data]);
        } catch (err) {
          console.error("!");
          if (typeof err === "string") {
            setErrorMessage(err);
          } else if (err instanceof Error) {
            setErrorMessage(err.message);
          }
        }
      })
    ).finally(() => setIsLoading(false));
  }, [nfts]);

  useEffect(() => {
    if (errorMessage) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: errorMessage,
      });
    }
  }, [errorMessage, toast]);

  return (
    <>
      {account && (
        <Card className="w-full">
          <CardHeader className="items-center p-1">
            <CardTitle>NFTS</CardTitle>
            <CardContent className="flex flex-wrap gap-1 p-1">
              {isLoading ? (
                <Loading />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {metadata &&
                    metadata.map((metadata, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden justify-between flex flex-col"
                      >
                        <CardContent className="p-0">
                          <img
                            className="w-full"
                            src={
                              metadata.image ??
                              "https://via.placeholder.com/150"
                            }
                            alt={metadata.image ?? metadata.name}
                          />
                        </CardContent>
                        <CardContent className="flex p-1 h-full bg-accent">
                          <p className="text-wrap self-end">{metadata.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </CardContent>
          </CardHeader>
        </Card>
      )}
    </>
  );
};

export default Nfts;
