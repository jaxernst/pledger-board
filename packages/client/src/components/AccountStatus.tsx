import { getComponentValue } from "@latticexyz/recs";
import { useMUD } from "../MUDContext";
import { shorthandAddress } from "../lib/util";
import { useTables } from "@latticexyz/dev-tools/src/tables/useTables";
import { useRows } from "@latticexyz/react";
import { useMemo, useState } from "react";
import { useReputation } from "../hooks/useReputation";

export const AccountStatus = () => {
  const {
    network: { playerEntity },
  } = useMUD();

  const { playerRep, reputation } = useReputation();

  const globalRank = useMemo(() => {
    return (
      reputation.findIndex(
        (e) => e.key.account.toLowerCase() === playerEntity?.toLowerCase()
      ) + 1 || reputation.length
    );
  }, [reputation]);

  //const rep = 0;

  if (!playerEntity) return null;

  return (
    <div className="flex gap-2 bg-transparent px-2 text-center text-sm text-zinc-200">
      <div className="rounded-2xl p-1 font-bold">
        <div className="text-xs font-bold text-violet-500">Player</div>
        {shorthandAddress(playerEntity)}
      </div>
      <div className="rounded-2xl p-1 font-bold">
        <div className="text-xs  text-violet-500">Reputation</div>
        {playerRep ? playerRep : "-"}
      </div>
      <div className="rounded-2xl p-1 font-bold">
        <div className="text-xs  text-violet-500">Global Rank</div>
        {globalRank ? `${globalRank} / ${reputation.length}` : "-"}
      </div>
    </div>
  );
};
