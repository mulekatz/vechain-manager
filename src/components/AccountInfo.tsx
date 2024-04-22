import { useConnex, useWallet } from "@vechain/dapp-kit-react";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import Loading from "./Loading";
import Balance from "./Balance";

const AccountInfo = () => {
  const connex = useConnex();
  const { account } = useWallet();
  const { toast } = useToast();
  const [vthoBalance, setVthoBalance] = useState<number | null>(null);
  const [vetBalance, setVetBalance] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    if (!connex || !account) {
      return;
    }
    connex.thor
      .account(account)
      .get()
      .then(({ energy, balance }: { energy: string; balance: string }) => {
        setVthoBalance(Number(BigInt(energy).toString().slice(0, -18)));
        setVetBalance(Number(BigInt(balance).toString().slice(0, -18)));
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setErrorMessage(err.message ?? "Could not load Account info.");
      });
  }, [connex, account]);

  useEffect(() => {
    toast({
      variant: "destructive",
      title: "Error!",
      description: errorMessage,
    });
  }, [errorMessage, toast]);

  return (
    <>
      {!account ? (
        <p>Please connect your wallet</p>
      ) : isLoading ? (
        <Loading />
      ) : (
        <>
          <Balance vetBalance={vetBalance} />
          <Balance vthoBalance={vthoBalance} />
        </>
      )}
    </>
  );
};

export default AccountInfo;
