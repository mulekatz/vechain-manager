import { Card, CardHeader } from "./ui/card";
import Wallet from "./ui/wallet";

const WalletComponent = () => {
  return (
    <Card className="w-full">
      <CardHeader className="items-center justify-center">
        <Wallet />
      </CardHeader>
    </Card>
  );
};

export default WalletComponent;
