import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import VetLogo from "../assets/VET_Token_Icon.png";
import VthoLogo from "../assets/VTHO_Token_Icon.png";

const Balance = ({
  vetBalance,
  vthoBalance,
}: {
  vetBalance?: number | null;
  vthoBalance?: number | null;
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="items-center">
        <CardTitle>{vetBalance ? "VET" : "VTHO"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full items-center justify-end gap-2">
          <p className="text-end">{vetBalance ?? vthoBalance}</p>
          <img src={vetBalance ? VetLogo : VthoLogo} className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Balance;
