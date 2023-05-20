import {
  Entity,
  Has,
  createEntity,
  getComponentValue,
  runQuery,
} from "@latticexyz/recs";
import { awaitStreamValue, stringToBytes32 } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { IWorld } from "contracts/types/ethers-contracts/IWorld";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity, world }: SetupNetworkResult,
  { Commitment }: ClientComponents
) {
  const createCommitment = async (
    description: string,
    deadline: number,
    photoProofDescription: string
  ) => {
    const id = createEntity(world);
    await worldSend("createCommitment", [stringToBytes32(id)]);
    await worldSend("addDescription", [stringToBytes32(id), description]);
    await worldSend("addDeadline", [stringToBytes32(id), deadline]);
    await worldSend("addPhotoSubmissionRequirement", [
      stringToBytes32(id),
      photoProofDescription,
    ]);

    await worldSend("activate", [stringToBytes32(id)]);
    return id;
  };

  const markComplete = async (id: Entity) => {
    console.log("marking complete", id);
    // TODO: Check that proof does not require photo and that the proof is active
    await worldSend("markComplete", [id]);
  };

  return {
    createCommitment,
    markComplete,
  };
}
