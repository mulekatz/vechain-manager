import { useConnex, useWallet } from "@vechain/dapp-kit-react";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import Balance from "./Balance";
import PleaseConnect from "./PleaseConnect";
import Xnode from "./Xnode";

const AccountInfo = () => {
  const connex = useConnex();
  const { account } = useWallet();
  const { toast } = useToast();
  const [vthoBalance, setVthoBalance] = useState<number | null>(null);
  const [vetBalance, setVetBalance] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!connex || !account) {
      return;
    }
    setIsLoading(true);
    connex.thor
      .account(account)
      .get()
      .then(({ energy, balance }: { energy: string; balance: string }) => {
        setVthoBalance(Number(BigInt(energy).toString().slice(0, -18)));
        setVetBalance(Number(BigInt(balance).toString().slice(0, -18)));
        setIsLoading(false);
      })
      .catch((err: Error) => {
        if (typeof err === "string") {
          setErrorMessage(err);
        } else if (err instanceof Error) {
          setErrorMessage(err.message);
        }
      });
  }, [connex, account]);

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
      {!account ? (
        <PleaseConnect />
      ) : (
        <div className="flex flex-col gap-1">
          <Xnode />
          <div className="flex w-full gap-1 h-fit">
            <Balance vetBalance={vetBalance} isLoading={isLoading} />
            <Balance vthoBalance={vthoBalance} isLoading={isLoading} />
          </div>
        </div>
      )}
    </>
  );
};

export default AccountInfo;
