import {
  Entity,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { formatTime } from "../lib/util";
import { useMUD } from "../MUDContext";
import { shorthandAddress } from "../lib/util";
import { CommitmentStatus } from "../types";
import { SubmitButton } from "./Util";
import { useObservableValue } from "@latticexyz/react";
import { useState } from "react";

export const CommitmentCard = ({ id }: { id: Entity }) => {
  const {
    components: { TaskDescription, Commitment, Deadline, ProofDescription },
    systemCalls: { completeWithProof },
    network: {
      playerEntity,
      network: { clock },
    },
  } = useMUD();

  const blockTime = (useObservableValue(clock.time$) || 0) / 1000;

  const description = getComponentValueStrict(TaskDescription, id).value;
  const photoDescription = getComponentValueStrict(ProofDescription, id).value;
  const commitment = getComponentValueStrict(Commitment, id);
  const isActive = commitment.status === CommitmentStatus.Active;

  const deadline = getComponentValueStrict(Deadline, id).value;
  const timeToDeadline = formatTime(deadline - blockTime);

  const [showUriInput, setShowUriInput] = useState(false);
  const [uriInput, setUriInput] = useState("");

  return (
    <>
      <div
        className="min-w flex flex-col gap-2 rounded-xl border-2 border-zinc-500 p-2"
        key={id}
      >
        <div className="flex flex-col items-center justify-between gap-2">
          <div
            className={`w-full whitespace-nowrap rounded-lg px-2 ${
              isActive ? "bg-green-400" : "bg-zinc-400"
            }`}
          >
            {deadline - blockTime > 0 ? (
              <>
                <span className="py-1 text-zinc-800">Due in </span>{" "}
                {timeToDeadline}
              </>
            ) : (
              <div>Deadline passed</div>
            )}
          </div>

          <div className="flex justify-between gap-2">
            <div className="w-min whitespace-nowrap rounded-lg bg-zinc-200 px-2">
              Creator: {shorthandAddress(commitment.owner)}
            </div>
            <div className="w-min whitespace-nowrap rounded-lg bg-zinc-200 px-2">
              Rep: {0}
            </div>
          </div>
        </div>

        <div>
          <div className="text-left text-xs font-bold text-zinc-600">
            Commitment
          </div>
          <div className=" text-zinc-500">{description}</div>
        </div>

        <div>
          <div className="text-left text-xs font-bold text-zinc-600">
            Photo Proof Description
          </div>
          <div className=" text-zinc-500">{photoDescription}</div>
        </div>

        {commitment.owner === playerEntity && (
          <div className="flex flex-col gap-2">
            {showUriInput ? (
              <input
                className="flex-grow rounded-xl border-2 border-stone-600 bg-zinc-200 p-1 text-sm text-zinc-700"
                type="text"
                placeholder="Enter external link to photo proof..."
                onInput={(e) => setUriInput((e.target as any).value)}
              />
            ) : (
              <div className="flex-grow" />
            )}

            <button
              onClick={() =>
                uriInput
                  ? completeWithProof(id, uriInput)
                  : setShowUriInput(!showUriInput)
              }
              className="whitespace-nowrap rounded-xl border-2 border-zinc-700 bg-violet-700 p-1 text-center text-white shadow-lg "
            >
              Submit Proof of Completion
            </button>
          </div>
        )}
      </div>
    </>
  );
};
