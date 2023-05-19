import { useState } from "react";
import { useMUD } from "../MUDContext";
import { AutoColumn, AutoRow, DescriptionInput, SubmitButton } from "./Util";

export const CommitmentBuilder = () => {
  const {
    systemCalls: { createCommitment },
  } = useMUD();

  const [description, setDescription] = useState("I commit to...");

  return (
    <>
      <DescriptionInput onInput={(v: string) => setDescription(v)} />

      <AutoColumn>
        <AutoRow label="Add Verification Method">
          <AutoRow.Item>Add deadline</AutoRow.Item>
          <AutoRow.Item>Add alarm schedule</AutoRow.Item>
          <AutoRow.Item>Add interval schedule</AutoRow.Item>
        </AutoRow>

        <AutoRow label="Add confirmation artifacts">
          <AutoRow.Item>No proof</AutoRow.Item>
          <AutoRow.Item>Photo proof</AutoRow.Item>
          <AutoRow.Item>Zk proof</AutoRow.Item>
        </AutoRow>

        <AutoRow label="Add Verification Method">
          <AutoRow.Item>Self attestation</AutoRow.Item>
          <AutoRow.Item>Partner Attestation</AutoRow.Item>
          <AutoRow.Item>Community Attestation</AutoRow.Item>
          <AutoRow.Item>External Attestation</AutoRow.Item>
        </AutoRow>
      </AutoColumn>

      <div className=" h-10" />
      <SubmitButton
        onSubmit={() => createCommitment(description)}
        klass="w-full p-2"
      >
        Generate Commitment
      </SubmitButton>
    </>
  );
};
