import { useMUD } from "../MUDContext";
import { shorthandAddress } from "../lib/util";

export const AccountStatus = () => {
  const {
    network: { playerEntity },
  } = useMUD();

  if (!playerEntity) return null;

  return (
    <div className="flex gap-2 bg-transparent text-center text-sm text-zinc-700 ">
      <div className="rounded-2xl bg-zinc-200 p-2">
        <div className="text-xs ">Player</div>
        {shorthandAddress(playerEntity)}
      </div>
      <div className="rounded-2xl bg-zinc-200 p-2">
        <div className="text-xs">Reputation Credits</div>
        550
      </div>
    </div>
  );
};
