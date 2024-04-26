import React from "react";
import { cn } from "@/lib/utils";

const Loading = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className }, ref) => (
  <div
    ref={ref}
    className={cn("flex w-full h-full items-center justify-center", className)}
  >
    <div className="border-b border-foreground rounded-full animate-spin h-6 w-6"></div>
  </div>
));

export default Loading;
