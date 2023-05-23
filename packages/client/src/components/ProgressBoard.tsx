import { Has, HasValue, Not, getComponentValue } from "@latticexyz/recs";
import { useMUD } from "../MUDContext";
import { useEntityQuery, useObservableValue } from "@latticexyz/react";
import { CommitmentStatus } from "../types";
import { CommitmentCard } from "./CommitmentCard";

const ColBody = "bg-indigo-100 overflow-auto";
const CardsContainer =
  "flex flex-wrap items-start justify-center gap-2 p-2 flex-row-reverse";
const ZoneContainerCol =
  "max-w-[800px] flex-shrink-0 text-center grid grid-rows-[auto,1fr]";

export const ProgressBoard = ({ klass }: { klass: string }) => {
  const {
    components: { Commitment, ProofRequirement, Deadline, ProofSubmission },
    network: {
      network: { clock },
    },
  } = useMUD();

  const blockTime = (useObservableValue(clock.time$) || 0) / 1000;

  const qualifiedCommitments = [
    Has(Commitment),
    HasValue(ProofRequirement, { value: 1 }),
    Has(Deadline),
  ];

  const ratingZoneCommitments = useEntityQuery([
    ...qualifiedCommitments,
    HasValue(Commitment, { status: CommitmentStatus.Active }),
    Not(ProofSubmission),
  ]).filter((id) => {
    const deadline = getComponentValue(Deadline, id)?.value || 0;
    return blockTime < deadline;
  });

  const attestionZoneCommitments = useEntityQuery([
    ...qualifiedCommitments,
    HasValue(Commitment, { status: CommitmentStatus.Complete }),
    Has(ProofSubmission),
  ]);

  const finalizedCommitments = useEntityQuery([
    ...qualifiedCommitments,
    HasValue(Commitment, { status: CommitmentStatus.Finalized }),
  ]);

  const failedCommitments = useEntityQuery([
    ...qualifiedCommitments,
    Not(ProofSubmission),
  ]).filter((id) => {
    const deadline = getComponentValue(Deadline, id)?.value || 0;
    return blockTime > deadline;
  });

  return (
    <div className={`flex flex-grow ${klass}`}>
      <div className={ZoneContainerCol}>
        <div className=" bg-blue-400 font-bold text-zinc-700">Rating Zone</div>
        <div className={ColBody}>
          <div className={CardsContainer}>
            {ratingZoneCommitments.map((id) => (
              <CommitmentCard key={id} id={id} zone="rating" />
            ))}
          </div>
        </div>
      </div>
      <div className={ZoneContainerCol}>
        <div className="bg-violet-400 font-bold text-zinc-700">
          Attestation Zone
        </div>
        <div className={ColBody}>
          <div className={CardsContainer}>
            {attestionZoneCommitments.map((id) => (
              <CommitmentCard key={id} id={id} zone="attesting" />
            ))}
          </div>
        </div>
      </div>
      <div className={ZoneContainerCol}>
        <div className=" bg-green-500 font-bold text-zinc-700">
          Completion Zone
        </div>
        <div className={ColBody}>
          <div className={CardsContainer}>
            {finalizedCommitments.map((id) => (
              <CommitmentCard key={id} id={id} zone="finalized" />
            ))}
          </div>
        </div>
      </div>
      <div className={ZoneContainerCol}>
        <div className=" bg-orange-400 font-bold text-zinc-700">
          Missed Deadline Zone
        </div>
        <div className={ColBody}>
          <div className={CardsContainer}>
            {failedCommitments.map((id) => (
              <CommitmentCard key={id} id={id} zone="failed" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
