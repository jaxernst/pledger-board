import { Entity, createEntity } from "@latticexyz/recs";
import { bytesToString, stringToBytes32 } from "@latticexyz/utils";
import { SetupNetworkResult } from "./setupNetwork";
import { ClientComponents } from "./createClientComponents";
import { formatBytes32String, hexZeroPad } from "ethers/lib/utils";
import { normalizeEntityID } from "@latticexyz/network";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, world }: SetupNetworkResult,
  components: ClientComponents
) {
  const createCommitment = async (
    description: string,
    deadline: number,
    photoProofDescription: string
  ) => {
    // Hardcoded for now
    const attestationDuration = 60 * 60 * 24 * 3; // 3 days

    await worldSend("registrationHelper", [
      description,
      deadline,
      photoProofDescription,
      attestationDuration,
    ]);
  };

  const markComplete = async (id: Entity) => {
    // TODO: Check that proof does not require photo and that the proof is active
    await worldSend("markComplete", [hexZeroPad(id, 32)]);
  };

  const completeWithProof = async (id: Entity, uri: string) => {
    await worldSend("completeWithProof", [hexZeroPad(id, 32), uri]);
  };

  const rateCommitment = async (id: Entity, rating: number) => {
    await worldSend("rate", [hexZeroPad(id, 32), rating]);
  };

  const attestToProof = async (id: Entity) => {
    await worldSend("attestToProof", [hexZeroPad(id, 32)]);
  };

  const finalize = async (id: Entity) => {
    await worldSend("finalize", [hexZeroPad(id, 32)]);
  };

  return {
    createCommitment,
    markComplete,
    completeWithProof,
    rateCommitment,
    attestToProof,
    finalize,
  };
}
