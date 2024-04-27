import { useConnex } from "@vechain/dapp-kit-react";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Block, TickerHead } from "@/types/types";
import Loading from "./Loading";

const Ticker = () => {
  const connex = useConnex();
  const { toast } = useToast();
  const [tickerHead, setTickerHead] = useState<TickerHead | null>(null);
  const [blockInfo, setBlockInfo] = useState<Block | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ticker = connex.thor.ticker();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let isMounted = true;
    try {
      ticker.next().then((head: TickerHead) => {
        if (isMounted) {
          if (head) {
            const blk = connex.thor.block(head.id);
            blk.get().then((block: Block) => {
              setTickerHead(head);
              setBlockInfo(block);
              setIsLoading(false);
            });
          }
        }
      });
    } catch (err) {
      if (isMounted) {
        if (typeof err === "string") {
          setErrorMessage(err);
        } else if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      }
    }
    return () => {
      isMounted = false;
    };
  }, [connex, ticker]);

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
    <div className="flex gap-1">
      <Card className="w-full">
        <CardHeader className="p-2">
          <CardTitle className="text-center">BLOCK</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          {!isLoading ? (
            <p className="text-2xl font-thin text-center">
              {tickerHead?.number.toLocaleString("en-US")}
            </p>
          ) : (
            <Loading />
          )}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="p-2">
          <CardTitle className="text-center">TXs</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          {!isLoading && tickerHead?.id !== "0" ? (
            <p className="text-2xl font-thin text-center">
              {blockInfo?.transactions.length}
            </p>
          ) : (
            <Loading />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Ticker;
