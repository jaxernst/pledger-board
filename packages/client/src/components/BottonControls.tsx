import { ReactNode } from "react";

// Make an aboslutely position componenton the botton center of the screen
export const BottomControls = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 transform flex-col gap-4">
      {children}
    </div>
  );
};
