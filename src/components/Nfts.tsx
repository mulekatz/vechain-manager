import { useEffect, useState } from "react";
import { BlockchainResult } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useWallet } from "@vechain/dapp-kit-react";
import { nftList } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

const Nfts = () => {
  const { account } = useWallet();
  const { toast } = useToast();
  const [nfts, setNfts] = useState<BlockchainResult["page"][]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!account) {
      return;
    }
    setIsLoading(true);
    const getNfts = async () => {
      try {
        const data = await nftList(account!);
        sessionStorage.setItem(
          "NftsCache",
          JSON.stringify({
            data,
            lastUpdated: Date.now(),
          })
        );
      } catch (err: any) {
        setErrorMessage(err.message ?? "Could not fetch stakedNfts.");
      } finally {
        setIsLoading(false);
        console.log("NFTS", nfts);
      }
    };
    const cache = JSON.parse(sessionStorage.getItem("NftsCache") || "{}");
    const lastUpdated = cache.lastUpdated;
    if (
      account &&
      !isLoading &&
      (!lastUpdated || Date.now() - lastUpdated > 30000)
    ) {
      getNfts();
    } else if (account && cache.data) {
      setNfts(cache.data);
    }
  }, [account]);

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [errorMessage]);

  return (
    <Card className="w-full">
      <CardHeader className="items-center">
        <CardTitle>NFTS</CardTitle>
        <CardContent>{errorMessage && errorMessage}</CardContent>
      </CardHeader>
    </Card>
  );
};

export default Nfts;
