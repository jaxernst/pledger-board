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
    <>
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
      <div className="flex h-full flex-col justify-center">
        <div className=" flex h-14 justify-between">
          <div className="fixed left-4 top-2">
            <AccountStatus />
          </div>

          <ActionButton
            klass="p-1 text-sm fixed top-4 right-4"
            onClick={() => setShowBuilder(!showBuilder)}
          >
            {showBuilder ? "Close Builder" : "Build Commitment"}
          </ActionButton>
        </div>

        <div className="my-2 flex-grow">
          <ProgressBoard klass="h-[80vh] overflow-auto rounded-2xl" />
        </div>

        <div className="fixed bottom-0 mt-3 flex flex-col">
          {/*<div className="flex gap-6 p-2 text-zinc-200">
            Reputation Leaderboard
            <div>1. jernst.eth</div>
            <div>2. digital-journey.eth</div>
            <div>3. digital-journey.eth</div>
  </div> */}
        </div>
      </div>
    </>
  );
};
