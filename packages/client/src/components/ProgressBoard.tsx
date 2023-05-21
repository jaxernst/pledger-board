import { Has, HasValue, Not, getComponentValue } from "@latticexyz/recs";
import { useMUD } from "../MUDContext";
import { useEntityQuery, useObservableValue } from "@latticexyz/react";
import { CommitmentStatus } from "../types";
import { CommitmentCard } from "./CommitmentCard";

const ZoneContainerCol = "w-[700px] flex-shrink-0 text-center flex flex-col";
const CommitmentContainerCol = "flex-grow flex gap-2 p-2";

export const ProgressBoard = () => {
  const {
    components: { Commitment, ProofRequirement, Deadline, ProofSubmission },
    network: {
      network: { clock },
    },
  } = useMUD();

  const blockTime = (useObservableValue(clock.time$) || 0) / 1000;
  console.log(blockTime);
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
    Has(Commitment),
    Has(ProofSubmission),
  ]);

  const failedCommitments = useEntityQuery([
    ...qualifiedCommitments,
    Not(ProofSubmission),
  ]).filter((id) => {
    const deadline = getComponentValue(Deadline, id)?.value || 0;
    return blockTime > deadline;
  });

  return (
    <div className="scrollbar-transparent flex flex-grow overflow-auto">
      <div className={ZoneContainerCol}>
        <div className=" bg-blue-400 font-bold text-zinc-700">Rating Zone</div>
        <div className="flex-grow bg-blue-50 ">
          <div className="flex flex-wrap justify-center gap-2 p-2">
            {ratingZoneCommitments.map((id) => (
              <CommitmentCard key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
      <div className={ZoneContainerCol}>
        <div className="bg-violet-400 font-bold text-zinc-700">
          Attestation Zone
        </div>
        <div className="flex-grow bg-blue-50 ">
          <div className="flex flex-wrap justify-center gap-2 p-2">
            {attestionZoneCommitments.map((id) => (
              <CommitmentCard key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
      <div className={ZoneContainerCol}>
        <div className=" bg-green-500 font-bold text-zinc-700">
          Completed Commitments
        </div>
        <div className="flex-grow bg-blue-50 ">
          <div className="flex flex-wrap justify-center gap-2 p-2"></div>
        </div>
      </div>
      <div className={ZoneContainerCol}>
        <div className=" bg-orange-400 font-bold text-zinc-700">
          Missed Deadline Commitments
        </div>
        <div className="flex-grow bg-blue-50 ">
          <div className="flex flex-wrap justify-center gap-2 p-2">
            {failedCommitments.map((id) => (
              <CommitmentCard key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
