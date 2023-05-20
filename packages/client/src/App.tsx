import { useEntityQuery } from "@latticexyz/react";
import { Has, HasValue } from "@latticexyz/recs";
import { useMUD } from "./MUDContext";
import { CommitmentBuilder } from "./components/CommitmentBuilder";
import { CommitmentCard } from "./components/CommitmentCard";
import { Hud } from "./components/Hud";
import { ActionButton, Collapsible } from "./components/Util";
import { BottomControls } from "./components/BottonControls";
import { useState } from "react";
import { CommitmentStatus } from "./types";

export const App = () => {
  const {
    components: { Commitment, Description },
  } = useMUD();

  const [showBuilder, setShowBuilder] = useState(false);

  const activeIds = useEntityQuery([
    HasValue(Commitment, { status: CommitmentStatus.Active }),
    Has(Description),
  ]);

  const completedIds = useEntityQuery([
    HasValue(Commitment, { status: CommitmentStatus.Complete }),
    Has(Description),
  ]);

  return (
    <>
      <div className="fixed left-4 top-4 z-50 flex flex-col gap-4 opacity-95">
        <Hud />
        <Collapsible isOpen={showBuilder}>
          <div className="rounded-xl bg-slate-200 p-4">
            <CommitmentBuilder onCreated={() => setShowBuilder(false)} />
          </div>
        </Collapsible>
      </div>

      <BottomControls>
        <ActionButton klass="p-2" onClick={() => setShowBuilder(!showBuilder)}>
          {showBuilder ? "Close Builder" : "Build Commitment"}
        </ActionButton>
      </BottomControls>

      <div className="absolute left-[50%] top-[50%] flex w-[80%] -translate-x-[50%] -translate-y-[50%]">
        <div className="flex-grow">
          <h2 className="text-lg font-bold">Active Commitments</h2>
          <div className="flex flex-wrap gap-2">
            {activeIds.map((id) => (
              <CommitmentCard key={id} id={id} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Completed Commitments</h2>
          <div className="flex flex-wrap gap-2">
            {completedIds.map((id) => (
              <CommitmentCard key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
