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
        className="w-full rounded-2xl border-2 border-stone-600 bg-zinc-500 p-3 text-zinc-700"
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

  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");

  const [completationArfictDescription, setCAD] = useState("");

  const create = () => {
    const date = new Date(`${deadlineDate} ${deadlineTime}`);
    const deadline = date.getTime() / 1000;
    console.log(deadline);
    createCommitment(description, deadline, completationArfictDescription);
    onCreated();
  };

  return (
    <div className="flex flex-col gap-3 py-2 text-zinc-100">
      Describe your commitment below. A good commitment should be specific, and
      proveable with a photo evidence. This is a public commitment and will be
      viewable and ratable by anyone.
      <input
        className="w-full rounded-2xl border-2 border-stone-600 bg-zinc-500 p-3 text-zinc-400"
        type="text"
        placeholder="Describe what you are committing to..."
        value={description}
        onInput={(e) => setDescription(e.currentTarget.value)}
      />
      When will you complete this commitment by?
      <div className="flex gap-2">
        <input
          className="rounded-2xl border-2 border-stone-600 bg-zinc-500 p-3 text-zinc-400"
          type="date"
          onInput={(e) => setDeadlineDate(e.currentTarget.value)}
        />
        <input
          className="rounded-2xl border-2 border-stone-600 bg-zinc-500 p-3 text-zinc-400"
          type="time"
          onInput={(e) => setDeadlineTime(e.currentTarget.value)}
        />
      </div>
      <div className="my-2 flex flex-col gap-2">
        <div>
          In order earn reputation from this commitment, community members must
          attest to the photo proof you submit before the deadline.
        </div>
        <input
          className="rounded-2xl border-2 border-stone-600 bg-zinc-500 p-3 text-zinc-400"
          type="text"
          placeholder="Describe the photo proof you will submit"
          onInput={(e) => setCAD(e.currentTarget.value)}
        />
      </div>
      <div className="mt-4">
        <SubmitButton onSubmit={create} klass="w-full p-2">
          Post Commitment
        </SubmitButton>
      </div>
    </div>
  );
};
