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
      } catch (err: any) {
        setErrorMessage(err.message ?? "Failed to fetch NFTs from API.");
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
    Promise.all(
      nfts.map(async (nft) => {
        try {
          const data = await fetchNftMetadata(nft.metadataUri);
          if (!data) {
            return;
          }
          setMetadata((prev) => [...prev, data]);
        } catch (err: any) {
          setErrorMessage(err.message ?? "Failed to fetch metadata from API.");
        }
      })
    ).finally(() => setIsLoading(false));
  }, [nfts]);

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [errorMessage, toast]);

  return (
    <>
      {account && (
        <Card className="w-full">
          <CardHeader className="items-center">
            <CardTitle>NFTS</CardTitle>
            <CardContent className="flex flex-wrap gap-1">
              {isLoading ? (
                <Loading />
              ) : (
                metadata &&
                metadata.map((metadata, index) => (
                  <Card key={index} className="overflow-hidden">
                    <img
                      className="w-32"
                      src={metadata.image ?? "https://via.placeholder.com/150"}
                      alt={metadata.image ?? metadata.name}
                    />
                    <CardContent className="p-1">
                      <p className="text-wrap">{metadata.name}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </CardHeader>
        </Card>
      )}
    </>
  );
};

export default Nfts;
