import { useState } from "react";
import { useMUD } from "../MUDContext";
import { AutoColumn, AutoRow, SubmitButton } from "./Util";

function DescriptionInput({ onInput }: { onInput: (v: string) => void }) {
  const [description, setDescription] = useState("");

  const handleInput = (val: string) => {
    if (!val.startsWith("I commit to")) return;
    setDescription(val);
    onInput(val);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        className="w-full rounded-2xl border-2 border-stone-600 bg-cyan-200 p-3 text-zinc-700"
        type="text"
        placeholder="I commit to..."
        value={description}
        onInput={(e) => handleInput(e.currentTarget.value)}
        onFocus={(e) => setDescription("I commit to")}
      />
      <div></div>
    </div>
  );
}

export const CommitmentBuilder = ({ onCreated }: { onCreated: () => void }) => {
  const {
    systemCalls: { createCommitment },
  } = useMUD();

  const [description, setDescription] = useState("I commit to...");

  return (
    <>
      <DescriptionInput onInput={(v: string) => setDescription(v)} />
      <div className="mt-4">
        <AutoColumn>
          <AutoRow label="Add a schedule to you commitment">
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
      </div>

      <div className=" h-10" />
      <SubmitButton
        onSubmit={() => createCommitment(description).then(onCreated)}
        klass="w-full p-2"
      >
        Generate Commitment
      </SubmitButton>
    </>
  );
};
