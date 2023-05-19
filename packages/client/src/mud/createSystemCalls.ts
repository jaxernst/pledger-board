import { createEntity, getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue, stringToBytes32 } from "@latticexyz/utils";
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
    const id = createEntity(world, [[Commitment, { value: true }]])
    console.log("created commitment with id", id)
    await worldSend("addDescription", [stringToBytes32(id), description]);
  }

  return {
    increment,
    createCommitment,
  };
}
