import { Card, CardHeader } from "./ui/card";

const Logo = () => {
  return (
    <Card className="w-full">
      <CardHeader className="h-full items-center justify-center p-2">
        <h1 className="font-semibold">VManager</h1>
      </CardHeader>
    </Card>
  );
};

export default Logo;
