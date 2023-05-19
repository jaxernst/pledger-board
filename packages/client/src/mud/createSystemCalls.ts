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
    adons?: [keyof IWorld, Parameters<typeof worldSend>][]
  ) => {
    const id = createEntity(world, [[Commitment, { value: true }]]);
    await worldSend("createCommitment", [stringToBytes32(id)]);
    await worldSend("addDescription", [stringToBytes32(id), description]);
    console.log("created commitment with id", id);

    for (const adon of adons ?? []) {
      await worldSend(...adon);
    }

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
