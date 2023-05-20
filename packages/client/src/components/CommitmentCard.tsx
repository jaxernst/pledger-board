import {
  Entity,
  getComponentValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { useMUD } from "../MUDContext";
import { shorthandAddress } from "../lib/util";
import { CommitmentStatus } from "../types";
import { SubmitButton } from "./Util";

export const CommitmentCard = ({ id }: { id: Entity }) => {
  const {
    components: { TaskDescription, Commitment },
    systemCalls: { markComplete },
    network: { playerEntity },
  } = useMUD();

  const description = getComponentValueStrict(TaskDescription, id).value;
  const commitment = getComponentValueStrict(Commitment, id);

  const isActive = commitment.status === CommitmentStatus.Active;

  return (
    <>
      <div
        className="flex min-h-[50px] flex-col gap-2 rounded-xl border-2 border-zinc-500 p-2"
        key={id}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="w-min whitespace-nowrap rounded-lg bg-zinc-200 px-2">
            {shorthandAddress(commitment.owner)}
          </div>
          <div
            className={`w-min whitespace-nowrap rounded-lg px-2 ${
              isActive ? "bg-green-400" : "bg-zinc-400"
            }`}
          >
            Status: {isActive ? "Active" : "Inactive"}
          </div>
        </div>

        <div className="w-min whitespace-nowrap text-xs">
          <span className="font-bold">Created:</span>{" "}
          {new Date(
            Number(commitment.activationTimestamp) * 1000
          ).toLocaleString()}
        </div>
        <div className=" text-zinc-500">{description}</div>
        {commitment.owner === playerEntity && (
          <div className="flex">
            <div className="flex-grow" />
            <SubmitButton onSubmit={() => markComplete(id)} klass="p-1">
              Mark Complete
            </SubmitButton>
          </div>
        )}
      </div>
    </>
  );
};
