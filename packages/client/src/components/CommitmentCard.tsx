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

export const CommitmentCard = ({
  id,
  zone,
}: {
  id: Entity;
  zone: "rating" | "attesting" | "complete" | "failed";
}) => {
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
        <div className="flex items-center justify-between gap-2">
          <div className="w-min whitespace-nowrap rounded-lg bg-zinc-200 px-2 font-bold text-violet-600">
            Creator: {shorthandAddress(commitment.owner)}
          </div>
          <div className="w-min whitespace-nowrap rounded-lg  px-2">
            Rep: {0}
          </div>
        </div>

        <div>
          <div className=" text-zinc-500">{description}</div>
        </div>

        {deadline - blockTime > 0 ? (
          <div className=" self-start whitespace-nowrap rounded-lg text-xs text-green-500">
            <span className="text-left font-bold text-zinc-600">Due in: </span>{" "}
            {timeToDeadline}
          </div>
        ) : null}

        <div className="flex gap-2 text-left text-xs text-zinc-600">
          <div className=" font-bold text-zinc-600">
            Photo Proof Description:
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

            <div className="flex items-center justify-between gap-2">
              {zone === "rating" ? (
                <button
                  onClick={() =>
                    uriInput
                      ? completeWithProof(id, uriInput)
                      : setShowUriInput(!showUriInput)
                  }
                  className="whitespace-nowrap rounded-xl border-2 border-zinc-700 bg-violet-700 p-1 text-center text-white "
                >
                  Submit Proof of Completion
                </button>
              ) : zone === "attesting" ? (
                <>
                  <div className="text-xs text-green-500">
                    Accepting Attestations
                  </div>
                  <button
                    onClick={() =>
                      uriInput
                        ? completeWithProof(id, uriInput)
                        : setShowUriInput(!showUriInput)
                    }
                    className="whitespace-nowrap rounded-xl border-2 border-zinc-700 bg-green-500 p-1 text-center text-white"
                  >
                    Mark Complete
                  </button>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
