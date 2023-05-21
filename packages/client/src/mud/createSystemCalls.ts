import { Entity, createEntity } from "@latticexyz/recs";
import { stringToBytes32 } from "@latticexyz/utils";
import { SetupNetworkResult } from "./setupNetwork";
import { ClientComponents } from "./createClientComponents";

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
    const id = createEntity(world);
    await worldSend("createCommitment", [stringToBytes32(id)]);
    await worldSend("addDescription", [stringToBytes32(id), description]);
    await worldSend("addDeadline", [stringToBytes32(id), deadline]);
    await worldSend("addPhotoSubmissionRequirement", [
      stringToBytes32(id),
      photoProofDescription,
    ]);

    const curTime = new Date().getTime() / 1000;
    const attestationDuration = Math.floor((deadline - curTime) / 2);
    await worldSend("makeAttestable", [
      stringToBytes32(id),
      attestationDuration,
    ]);
    await worldSend("activate", [stringToBytes32(id)]);
    return id;
  };

  const markComplete = async (id: Entity) => {
    console.log("marking complete", id);
    // TODO: Check that proof does not require photo and that the proof is active
    await worldSend("markComplete", [id]);
  };

  const completeWithProof = async (id: Entity, uri: string) => {
    await worldSend("completeWithProof", [id, uri]);
  };

  const rateCommitment = async (id: Entity, rating: number) => {
    await worldSend("rate", [id, rating]);
  };

  const attestToProof = async (id: Entity) => {
    await worldSend("attestToProof", [id]);
  };

  const finalize = async (id: Entity) => {
    await worldSend("finalize", [id]);
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
