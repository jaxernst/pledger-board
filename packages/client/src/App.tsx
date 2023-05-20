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
      <div className=" px-4 pt-2">
        <AccountStatus />
      </div>

      <Dialog
        open={showBuilder}
        onClose={() => setShowBuilder(false)}
        className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-zinc-200 bg-opacity-80 p-2"
      >
        <Dialog.Panel>
          <Dialog.Title className="text-lg font-bold text-zinc-800">
            Create a Commitment
          </Dialog.Title>
          <div className="px-2">
            <CommitmentBuilder onCreated={() => setShowBuilder(false)} />
          </div>
        </Dialog.Panel>
      </Dialog>

      <div className="flex flex-grow flex-col px-4 py-2">
        <div className="rounded-t-xl bg-slate-700 p-2 text-center font-bold text-zinc-200">
          Commitment Progression Board
        </div>
        <ProgressBoard />
        <div className="rounded-b-xl bg-slate-700 p-2 font-bold text-zinc-200">
          Total Commitments: 13
        </div>
      </div>

      <BottomControls>
        <ActionButton klass="p-1" onClick={() => setShowBuilder(!showBuilder)}>
          {showBuilder ? "Close Builder" : "Build Commitment"}
        </ActionButton>
      </BottomControls>
    </div>
  );
};
