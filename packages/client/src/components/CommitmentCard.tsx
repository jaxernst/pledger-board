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
import { StarRating } from "./StarRating";

const RatingZoneView = ({ id }: { id: Entity }) => {
  const {
    components: { Commitment, Deadline, ProofRequirement },
    systemCalls: { rateCommitment, completeWithProof },
    network: { playerEntity },
  } = useMUD();

  const commitment = getComponentValueStrict(Commitment, id);

  const [aRating, setARating] = useState(0);
  const [pRating, setPRating] = useState(0);
  const [oRating, setORating] = useState(0);

  const submitRating = () => {
    rateCommitment(id, aRating + pRating + oRating);
  };

  const [showUriInput, setShowUriInput] = useState(false);
  const [uriInput, setUriInput] = useState("");

  return (
    <div className="flex flex-col gap-1">
      <div className="text-md gap- my-1 flex flex-col text-sm font-bold text-zinc-700">
        <div className="flex items-center gap-3">
          <div>Ambition</div>
          <div>
            <StarRating onRatingChanged={(val) => setARating(val)} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>Proveability</div>
          <div>
            <StarRating onRatingChanged={(val) => setPRating(val)} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>Positive Outcome</div>
          <div>
            <StarRating onRatingChanged={(val) => setORating(val)} />
          </div>
        </div>
        {oRating || pRating || aRating ? (
          <button
            onClick={submitRating}
            className=" my-2 w-min whitespace-nowrap rounded-xl border-2 border-zinc-700 bg-green-500 p-1 px-2 font-normal text-zinc-100"
          >
            Submit Rating
          </button>
        ) : null}
      </div>

      {commitment.owner === playerEntity && (
        <>
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
          <div className="flex items-center justify-center gap-2">
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
          </div>
        </>
      )}
    </div>
  );
};
const AttestationZoneView = ({ id }: { id: Entity }) => {
  const {
    components: { Commitment, ProofSubmission },
    systemCalls: { attestToProof, finalize },
    network: { playerEntity },
  } = useMUD();

  const commitment = getComponentValueStrict(Commitment, id);
  const proof = getComponentValueStrict(ProofSubmission, id);

  return (
    <div className="flex flex-col gap-2">
      <div className=" text-xs font-bold text-zinc-600">
        Proof Of Completion
        <div className="w-full rounded-xl  bg-zinc-300 p-2">
          <a
            target="_blank"
            rel="noreferrer"
            className="text-violet-600 underline"
            href={proof.uri}
          >
            {proof.uri}
          </a>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        {commitment.owner === playerEntity ? (
          <>
            <div className="text-xs text-green-500">Accepting Attestations</div>
            <button
              onClick={() => finalize(id)}
              className="whitespace-nowrap rounded-xl border-2 border-zinc-700 bg-green-500 p-1 text-center text-white"
            >
              Finalize
            </button>
          </>
        ) : (
          <>
            <div className="text-xs text-green-500">Attestions: 0 / 3</div>
            <button
              onClick={() => attestToProof(id)}
              className="whitespace-nowrap rounded-xl border-2 border-zinc-700 bg-green-500 p-1 text-center text-white"
            >
              Attest to Proof
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const CommitmentCard = ({
  id,
  zone,
}: {
  id: Entity;
  zone: "rating" | "attesting" | "complete" | "finalized" | "failed";
}) => {
  const {
    components: {
      TaskDescription,
      Commitment,
      Deadline,
      ProofDescription,
      RatingSum,
      AttestationValue,
    },
    systemCalls: { completeWithProof, rateCommitment },
    network: {
      playerEntity,
      network: { clock },
    },
  } = useMUD();

  const blockTime = (useObservableValue(clock.time$) || 0) / 1000;

  const commitment = getComponentValueStrict(Commitment, id);
  const description = getComponentValueStrict(TaskDescription, id).value;
  const photoDescription = getComponentValueStrict(ProofDescription, id).value;
  const deadline = getComponentValueStrict(Deadline, id).value;
  const timeToDeadline = formatTime(deadline - blockTime);

  const ratingSum = getComponentValue(RatingSum, id)?.value || 0;
  const attestationValue = getComponentValue(AttestationValue, id)?.value || 0;

  return (
    <>
      <div
        className="min-w flex flex-col gap-2 rounded-xl border-2 border-zinc-500 p-2"
        key={id}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="w-min whitespace-nowrap rounded-lg bg-violet-200 px-2 font-bold text-violet-600">
            Creator: {shorthandAddress(commitment.owner)}
          </div>
          <div className="w-min whitespace-nowrap rounded-lg px-2 text-sm">
            {zone === "rating" ? (
              <>Rating: {ratingSum}</>
            ) : (
              <>Earned Rep: {attestationValue}</>
            )}
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

        {zone === "rating" && <RatingZoneView id={id} />}
        {zone === "attesting" && <AttestationZoneView id={id} />}
      </div>
    </>
  );
};
