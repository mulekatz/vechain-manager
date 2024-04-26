import { Card, CardHeader } from "./ui/card";
import Wallet from "./ui/wallet";

const WalletComponent = () => {
  return (
    <Card className="w-full">
      <CardHeader className="items-center justify-center gap-1 p-2">
        <Wallet />
      </CardHeader>
    </Card>
  );
};

export default WalletComponent;
