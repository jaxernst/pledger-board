import { Has, HasValue } from "@latticexyz/recs";
import { useMUD } from "../MUDContext";
import { useEntityQuery } from "@latticexyz/react";
import { CommitmentStatus } from "../types";
import { CommitmentCard } from "./CommitmentCard";

const colStyle = "w-[700px] flex-shrink-0 text-center flex flex-col";

export const ProgressBoard = () => {
  const {
    components: { Commitment, ProofRequirement },
  } = useMUD();

  const ratingZoneCommitments = useEntityQuery([Has(Commitment)]);

  console.log(ratingZoneCommitments);

  return (
    <div className="scrollbar-transparent flex flex-grow overflow-auto">
      <div className={colStyle}>
        <div className=" bg-blue-400 font-bold text-zinc-700">Rating Zone</div>
        <div className="flex-grow bg-blue-200"></div>
      </div>
      <div className={colStyle}>
        <div className="bg-violet-400 font-bold text-zinc-700">
          Attestation Zone
        </div>
        <div className="flex-grow bg-violet-200"></div>
      </div>
      <div className={colStyle}>
        <div className=" bg-green-500 font-bold text-zinc-700">
          Completed Commitments
        </div>
        <div className="flex-grow bg-green-200"></div>
      </div>
      <div className={colStyle}>
        <div className=" bg-orange-400 font-bold text-zinc-700">
          Failed Commitments
        </div>
        <div className="flex-grow bg-orange-200">
          {ratingZoneCommitments.map((id) => (
            <CommitmentCard key={id} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
};
