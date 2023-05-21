import { useEntityQuery } from "@latticexyz/react";
import { Has, HasValue } from "@latticexyz/recs";
import { useMUD } from "./MUDContext";
import { CommitmentBuilder } from "./components/CommitmentBuilder";
import { CommitmentCard } from "./components/CommitmentCard";
import { AccountStatus } from "./components/AccountStatus";
import { ActionButton, Collapsible } from "./components/Util";
import { BottomControls } from "./components/BottonControls";
import { useState } from "react";
import { CommitmentStatus } from "./types";
import { ProgressBoard } from "./components/ProgressBoard";
import { Dialog } from "@headlessui/react";

export const App = () => {
  const {
    components: { Commitment, TaskDescription },
  } = useMUD();

  const [showBuilder, setShowBuilder] = useState(false);
  const a = useEntityQuery([Has(Commitment)]);
  console.log("a", a);
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex h-12 justify-between px-4 pt-2 ">
        <AccountStatus />

        <ActionButton klass="p-1" onClick={() => setShowBuilder(!showBuilder)}>
          {showBuilder ? "Close Builder" : "Build Commitment"}
        </ActionButton>
      </div>

      <Dialog
        open={showBuilder}
        onClose={() => setShowBuilder(false)}
        className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#1b1b1b] p-2"
      >
        <Dialog.Panel>
          <Dialog.Title className="px-2 py-1 text-xl font-bold text-violet-600">
            Create a Commitment
          </Dialog.Title>
          <div className="px-2">
            <CommitmentBuilder onCreated={() => setShowBuilder(false)} />
          </div>
        </Dialog.Panel>
      </Dialog>

      <div className="mt-3 flex flex-grow flex-col">
        <ProgressBoard />
      </div>
    </div>
  );
};
