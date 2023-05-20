import { ReactNode } from "react";

// Make an aboslutely position componenton the botton center of the screen
export const BottomControls = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full justify-center gap-4 p-2">{children}</div>;
};
