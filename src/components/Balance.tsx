import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import VetLogo from "../assets/VET_Token_Icon.png";
import VthoLogo from "../assets/VTHO_Token_Icon.png";
import Loading from "./Loading";

const Balance = ({
  vetBalance,
  vthoBalance,
  isLoading,
}: {
  vetBalance?: number | null;
  vthoBalance?: number | null;
  isLoading?: boolean;
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="p-2">
        <CardTitle className="text-center">
          {(vetBalance || vetBalance === 0) && "VET"}
          {(vthoBalance || vthoBalance === 0) && "VTHO"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex w-full items-center justify-center gap-2">
          {isLoading && <Loading className="w-fit" />}
          <p className="text-2xl font-thin text-center">
            {vetBalance?.toLocaleString("en-US") ??
              vthoBalance?.toLocaleString("en-US")}
          </p>
          <img src={vetBalance ? VetLogo : VthoLogo} className="w-5 h-5" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Balance;
