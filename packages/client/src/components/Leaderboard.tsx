import { useState } from "react";
import { useReputation } from "../hooks/useReputation";
import { shorthandAddress } from "../lib/util";

const RankCard = ({
  pos,
  account,
  value,
}: {
  pos: number;
  account: string;
  value: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="flex items-start justify-between gap-1 rounded-xl bg-zinc-300 p-1 pr-2 text-xs font-bold"
    >
      <div className="rounded-full bg-violet-500 px-1">{pos}</div>
      <div>{open ? account : shorthandAddress(account)}</div>|<div>{value}</div>
    </button>
  );
};

export const Leaderboard = () => {
  const { reputation } = useReputation();

  return (
    <div className="no-scrollbar flex items-center gap-1 overflow-x-auto p-2 py-3">
      <div className="whitespace-nowrap px-2 font-bold text-violet-500">
        Leaderboard
      </div>
      {reputation.map((row, i) => (
        <div key={i}>
          <RankCard
            pos={i + 1}
            account={row.key.account}
            value={Number(row.value.value ?? 0)}
          />
        </div>
      ))}
    </div>
  );
};
