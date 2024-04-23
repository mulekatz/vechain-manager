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
      <CardHeader className="p-2">
        <CardTitle>{vetBalance ? "VET" : "VTHO"}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex w-full items-center gap-2">
          <p className="text-end">
            {vetBalance?.toLocaleString("en-US") ??
              vthoBalance?.toLocaleString("en-US")}
          </p>
          <img src={vetBalance ? VetLogo : VthoLogo} className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Balance;
