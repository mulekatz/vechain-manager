import { Card, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";

const Title = ({ title, className }: { title: string; className?: string }) => {
  return (
    <Card className="w-full">
      <CardHeader
        className={cn("h-full items-center justify-center p-2", className)}
      >
        <h1 className="font-semibold">{title}</h1>
      </CardHeader>
    </Card>
  );
};

export default Title;
