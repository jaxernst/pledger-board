import { useEntityQuery } from "@latticexyz/react";
import { Has } from "@latticexyz/recs";
import { useMUD } from "./MUDContext";
import { CommitmentBuilder } from "./components/CommitmentBuilder";

import { AccountStatus } from "./components/AccountStatus";
import { ActionButton } from "./components/Util";

import { useState } from "react";

import { ProgressBoard } from "./components/ProgressBoard";
import { Dialog } from "@headlessui/react";

export const App = () => {
  const {
    components: { Commitment },
  } = useMUD();

  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <>
      <Dialog
        open={showBuilder}
        onClose={() => setShowBuilder(false)}
        className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-zinc-800 p-2"
      >
        <Dialog.Panel>
          <Dialog.Title className="px-2 py-1 text-xl font-bold text-zinc-200">
            Create a Commitment
          </Dialog.Title>
          <div className="px-2">
            <CommitmentBuilder onCreated={() => setShowBuilder(false)} />
          </div>
        </Dialog.Panel>
      </Dialog>

      <div className="flex h-full flex-col justify-center">
        <div className=" grid h-14 grid-cols-[1fr,auto,1fr] items-center justify-between px-2">
          <AccountStatus />

          <h1 className="text-lg font-bold text-zinc-100">Pledger - Board</h1>

          <ActionButton
            klass="p-1 text-sm justify-self-end"
            onClick={() => setShowBuilder(!showBuilder)}
          >
            {showBuilder ? "Close Builder" : "Build Commitment"}
          </ActionButton>
        </div>

        <ProgressBoard klass="flex-grow overflow-auto rounded-2xl" />

        <div className="flex h-20 gap-6 p-2 text-zinc-200">
          Reputation Leaderboard
          <div>1. jernst.eth</div>
          <div>2. digital-journey.eth</div>
          <div>3. digital-journey.eth</div>
        </div>
      </div>
    </>
  );
};
