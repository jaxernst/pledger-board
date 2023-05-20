import { useState } from "react";
import { useMUD } from "../MUDContext";
import { AutoColumn, AutoRow, SubmitButton } from "./Util";

function DescriptionInput({
  placeholder,
  onInput,
}: {
  placeholder: string;
  onInput: (v: string) => void;
}) {
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

  const [description, setDescription] = useState("");

  const [deadline, setDeadline] = useState(0);
  const onDeadlineInput = (dateVal: string) => {
    const date = new Date(dateVal);
    setDeadline(Math.floor(date.getTime() / 1000));
  };

  const [completationArfictDescription, setCAD] = useState("");

  const create = () => {
    createCommitment(description, deadline, completationArfictDescription);
    onCreated();
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      Describe your commitment below. A good commitment should be specific, and
      proveable with a photo evidence. This is a public commitment and will be
      viewable and ratable by anyone.
      <input
        className="w-full rounded-2xl border-2 border-stone-600 bg-cyan-200 p-3 text-zinc-700"
        type="text"
        placeholder="Describe what you are committing to..."
        value={description}
        onInput={(e) => setDescription(e.currentTarget.value)}
      />
      When will you complete this commitment by?
      <input
        className="rounded-2xl border-2 border-stone-600 bg-cyan-200 p-3 text-zinc-700"
        type="date"
        onInput={(e) => onDeadlineInput(e.currentTarget.value)}
      />
      <div className="my-1 flex flex-col gap-1">
        <div>
          In order for your commitment to earn you reputation, community members
          must attest to the photo proof you submit before the deadline.
        </div>
        <div>
          Describe the photo you will submit to prove you completed your
          commitment
        </div>
        <input
          className="rounded-2xl border-2 border-stone-600 bg-cyan-200 p-3 text-zinc-700"
          type="text"
          placeholder="Describe the photo proof you will submit"
          onInput={(e) => setCAD(e.currentTarget.value)}
        />
      </div>
      <div className="mt-4">
        <SubmitButton onSubmit={create} klass="w-full p-2">
          Generate Commitment
        </SubmitButton>
      </div>
    </div>
  );
};
