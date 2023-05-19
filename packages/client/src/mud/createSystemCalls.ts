import {
  createEntity,
  getComponentValue,
  getEntitySymbol,
} from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity, world }: SetupNetworkResult,
  { Counter, Commitment }: ClientComponents
) {
  const increment = async () => {
    const tx = await worldSend("increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const createCommitment = async (description: string) => {
    const entity = createEntity(world, [[Commitment, { value: true }]]);
    world.registerEntity;
    await worldSend("addDescription", [entity, description]);
    return entity;
  };

  return {
    increment,
    createCommitment,
  };
}
