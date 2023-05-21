import { useMUD } from "../MUDContext";
import { shorthandAddress } from "../lib/util";

export const AccountStatus = () => {
  const {
    network: { playerEntity },
  } = useMUD();

  if (!playerEntity) return null;

  return (
    <div className="flex gap-2 bg-transparent text-center text-sm text-zinc-200 ">
      <div className="rounded-2xl p-1 px-3 font-bold">
        <div className="text-xs font-bold text-violet-600">Player</div>
        {shorthandAddress(playerEntity)}
      </div>
      <div className="rounded-2xl p-1 px-3 font-bold">
        <div className="text-xs  text-violet-600">Reputation</div>
        550
      </div>
    </div>
  );
};
