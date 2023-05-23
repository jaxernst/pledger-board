import {
  Entity,
  getComponentValue,
  getComponentValueStrict,
  getEntityComponents,
} from "@latticexyz/recs";
import { formatTime } from "../lib/util";
import { useMUD } from "../MUDContext";
import { shorthandAddress } from "../lib/util";
import { useObservableValue, useRow, useRows } from "@latticexyz/react";
import { useState } from "react";
import { StarRating } from "./StarRating";
import { hexZeroPad } from "ethers/lib/utils";
import { FileUpload } from "./FileUpload";
import { storeImage } from "../lib/uploadImage";

/**
 * If you're reading this, I'm sorry
 */

const CardBottom = "flex flex-col gap-1 ";

const RatingZoneView = ({ id }: { id: Entity }) => {
  const {
    components: { Commitment, Ratings },
    systemCalls: { rateCommitment, completeWithProof },
    network: { playerEntity, storeCache },
  } = useMUD();

  const commitment = getComponentValueStrict(Commitment, id);

  const [aRating, setARating] = useState(0);
  const [pRating, setPRating] = useState(0);
  const [oRating, setORating] = useState(0);

  const submitRating = () => {
    rateCommitment(id, aRating + pRating + oRating);
  };

  const alreadyRated =
    useRows(storeCache, {
      table: "Ratings",
    })?.filter(
      (r) =>
        r.key.commitmentId === hexZeroPad(id, 32) &&
        r.key.account.toLowerCase() === playerEntity
    ).length === 1;

  const isOwnCommitment =
    playerEntity?.toLowerCase() === commitment.owner.toLowerCase();
  const canRate = !isOwnCommitment && !alreadyRated;

  const [showUriInput, setShowUriInput] = useState(false);
  const [uriInput, setUriInput] = useState("");
  const [uploadFile, setUploadFile] = useState<File>();
  const [submitting, setSubmitting] = useState(false);

  const submitCompletion = () => {
    const upload = async () => {
      if (!uploadFile) return;
      return await storeImage(uploadFile);
    };

    const submit = async (ipfsHash?: string) => {
      await completeWithProof(id, ipfsHash ? "ipfs/" + ipfsHash : uriInput);
    };

    setSubmitting(true);
    upload()
      .then(submit)
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={CardBottom}>
      <div className="flex flex-col text-sm font-bold text-zinc-600">
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
      </div>
      <div className="flex w-full justify-center">
        <button
          onClick={submitRating}
          className={
            "mt-2 w-min whitespace-nowrap rounded-xl border-2 bg-green-500 p-1 px-2 text-sm font-normal text-zinc-100" +
            (!canRate || submitting ? " opacity-50 " : " ")
          }
          disabled={!canRate || submitting}
        >
          {submitting
            ? "Submitting..."
            : isOwnCommitment
            ? "Can't rate"
            : alreadyRated
            ? "Rating Submitted"
            : "Submit Rating"}
        </button>
      </div>

      {commitment.owner.toLowerCase() === playerEntity && (
        <>
          {showUriInput ? (
            <>
              <input
                className="flex-grow rounded-md border-2 border-dashed border-stone-600 bg-transparent p-1 text-sm text-zinc-700"
                type="text"
                placeholder="Enter external link to photo proof..."
                onInput={(e) => setUriInput((e.target as any).value)}
              />
              or
              <div>
                <FileUpload onFileSelected={setUploadFile} file={uploadFile} />
                {uploadFile ? (
                  <button
                    className="text-xs"
                    onClick={() => setUploadFile(undefined)}
                  >
                    (cancel)
                  </button>
                ) : null}
              </div>
            </>
          ) : (
            <div className="flex-grow" />
          )}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() =>
                uriInput || uploadFile
                  ? submitCompletion()
                  : setShowUriInput(!showUriInput)
              }
              className="whitespace-nowrap rounded-xl border-2 bg-violet-700 p-1 px-2 text-center text-sm text-white "
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
    network: { playerEntity, storeCache },
  } = useMUD();

  const commitment = getComponentValueStrict(Commitment, id);
  const proof = getComponentValueStrict(ProofSubmission, id);

  const ratings = useRows(storeCache, { table: "Ratings" }).filter((row) => {
    return row.key.commitmentId === hexZeroPad(id, 32);
  });

  const playerRatedCommitment =
    ratings.filter((row) => row.key.account.toLowerCase() === playerEntity)
      .length === 1;

  const attestations = useRows(storeCache, {
    table: "Attestations",
  }).filter((row) => {
    return row.key.commitmentId === hexZeroPad(id, 32);
  });

  const playerAttestedToProof =
    attestations.filter((row) => row.key.account.toLowerCase() === playerEntity)
      .length === 1;

  const attestationDisabled = !playerRatedCommitment || playerAttestedToProof;

  const isNftStorageFile = proof.uri?.startsWith("ipfs/");

  return (
    <div className={CardBottom}>
      <div className=" text-xs font-bold text-zinc-600">
        Proof Of Completion
        <div className="w-full rounded-xl  bg-zinc-300 p-2">
          <a
            target="_blank"
            rel="noreferrer"
            className="flex justify-center text-violet-500 underline"
            href={proof.uri}
          >
            {isNftStorageFile ? (
              <img
                className="max-h-[300px]"
                src={"https://nftstorage.link/" + proof.uri}
              />
            ) : (
              proof.uri
            )}
          </a>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 pt-2">
        {commitment.owner.toLowerCase() === playerEntity ? (
          <>
            <div className="text-xs text-green-500">
              Accepting Attestations ({attestations.length} / {ratings.length})
            </div>
            <button
              onClick={() => finalize(id)}
              className="whitespace-nowrap rounded-xl border-2  bg-green-500 p-1 text-center text-white"
            >
              Finalize
            </button>
          </>
        ) : (
          <>
            <div>
              <div className="text-xs text-green-500">
                Attestions: {attestations.length} / {ratings.length}
              </div>
            </div>
            <button
              onClick={() => attestToProof(id)}
              disabled={attestationDisabled}
              className={
                "whitespace-nowrap rounded-xl border-2 bg-green-500 p-1 text-center text-sm text-white" +
                (attestationDisabled ? " opacity-50" : "")
              }
            >
              {playerAttestedToProof
                ? "Attestion Received!"
                : "Attest to Proof"}
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
      AttestationPeriod,
      ProofSubmission,
    },
    network: {
      network: { clock },
    },
  } = useMUD();

  const blockTime = (useObservableValue(clock.time$) || 0) / 1000;

  const commitment = getComponentValueStrict(Commitment, id);
  const creationDate = new Date(Number(commitment.activationTimestamp) * 1000);
  const description = getComponentValue(TaskDescription, id)?.value ?? "";
  const photoDescription = getComponentValue(ProofDescription, id)?.value ?? "";
  const deadline = getComponentValueStrict(Deadline, id).value;
  const timeToDeadline = formatTime(deadline - blockTime);

  const attestatonPeriod = getComponentValueStrict(AttestationPeriod, id).value;
  const submissionTime = Number(
    getComponentValue(ProofSubmission, id)?.submissionTime
  );
  const attestationTimeRemaining = submissionTime
    ? formatTime(submissionTime + attestatonPeriod - blockTime)
    : 0;

  const ratingSum = getComponentValue(RatingSum, id)?.value || 0;
  const attestationValue = getComponentValue(AttestationValue, id)?.value || 0;

  return (
    <>
      <div
        className="min-w flex flex-col gap-2 rounded-xl border-2 border-zinc-900 p-2"
        key={id}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="w-min whitespace-nowrap rounded-lg bg-violet-200 px-2 font-bold text-violet-500">
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
          <div
            className={
              zone === "failed"
                ? " text-red-500 line-through"
                : " text-zinc-500 "
            }
          >
            {description}
          </div>
        </div>

        <div className="self-start whitespace-nowrap rounded-lg text-xs text-green-500">
          <span className="text-left font-bold text-zinc-600">Created: </span>
          {creationDate.toLocaleDateString()}
        </div>
        <div className="self-start whitespace-nowrap rounded-lg text-xs text-green-500">
          {zone === "attesting" ? (
            <>
              <span className="text-left font-bold text-zinc-600">
                Attestation Period Over:{" "}
              </span>{" "}
              {attestationTimeRemaining}
            </>
          ) : deadline - blockTime > 0 ? (
            <>
              <span className="text-left font-bold text-zinc-600">
                Due in:{" "}
              </span>
              {timeToDeadline}
            </>
          ) : null}
        </div>

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
