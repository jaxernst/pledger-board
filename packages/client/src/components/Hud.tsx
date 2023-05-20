import { useMUD } from "../MUDContext";
import { shorthandAddress } from "../lib/util";

export const Hud = () => {
  const {
    network: { playerEntity },
  } = useMUD();

  if (!playerEntity) return null;

  return (
    <div className="flex gap-3 text-center text-sm">
      <div className="rounded-2xl bg-zinc-200 p-2">
        <div className="text-xs ">Player</div>
        {shorthandAddress(playerEntity)}
      </div>
      <div className="rounded-2xl bg-zinc-200 p-2">
        <div className="text-xs">Sponsor Credits</div>
        10
      </div>
      <div className="rounded-2xl bg-zinc-200 p-2">
        <div className="text-xs">Attest Credits</div>
        10
      </div>
    </div>
  );
};
