import { useRows } from "@latticexyz/react";
import { Entity } from "@latticexyz/recs";
import { useMemo, useState } from "react";
import { useMUD } from "../MUDContext";

export function useReputation() {
  const {
    network: { playerEntity, storeCache },
  } = useMUD();

  const rep = useRows(storeCache, { table: "Reputation" });
  const [playerRep, setMyRep] = useState(0);

  if (
    rep.length === 1 &&
    rep[0].key.account.toLowerCase() === playerEntity?.toLowerCase()
  ) {
    setMyRep(Number(rep[0].value));
  }

  const sorted = useMemo(
    () =>
      rep.sort((a, b) => {
        if (a.key.account.toLowerCase() === playerEntity?.toLowerCase()) {
          setMyRep(Number(a.value));
        }

        return Number(a.value) - Number(b.value);
      }),
    [rep, playerEntity]
  );

  return {
    playerRep,
    reputation: sorted,
  };
}
