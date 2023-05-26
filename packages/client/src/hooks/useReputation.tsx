import { useComponentValue, useRows } from "@latticexyz/react";
import { useEffect, useMemo, useState } from "react";
import { useMUD } from "../MUDContext";
import { Entity } from "@latticexyz/recs";

export function useReputation() {
  const {
    network: { playerEntity, storeCache },
    components: { Reputation },
  } = useMUD();

  /** Issue #1
   * The reuptation table is returning rows with the expected keys, but the
   * values not match the values onchain (MUD Dev tools shows the correct values)
   */
  const rep = useRows(storeCache, { table: "Reputation" });
  console.log("Reputation table with seemingly missing values", rep);
  console.log(
    "useComponentValue returns the expected vaue for entity:",
    "0x5218A8eDA30D0c8BD33E60843325725cD8A9f633",
    useComponentValue(
      Reputation,
      "0x5218A8eDA30D0c8BD33E60843325725cD8A9f633" as Entity
    )
  );

  /** Issue #2
   * Player entity: 0x5218a8eda30d0c8bd33e60843325725cd8a9f633
   * Table 'account' key: 0x5218A8eDA30D0c8BD33E60843325725cD8A9f633
   * Issue: player entity address returned from useMUD is not checksummed,
   * but the useRows hook will only match with a checksummed address.
   */
  const myRep = useRows(storeCache, {
    table: "Reputation",
    key: {
      eq: {
        account: playerEntity as `0x${string}`,
      },
    },
  }); // -> Does not match with playerEntity but does match with checksummed 'account'

  // Currently using this as a workaround for the above issue
  const [playerRep, setMyRep] = useState(0);

  useEffect(() => {
    if (
      rep.length === 1 &&
      rep[0].key.account.toLowerCase() === playerEntity?.toLowerCase()
    ) {
      setMyRep(Number(rep[0].value.value));
    }
  }, [rep, playerEntity]);

  const sorted = useMemo(
    () =>
      rep.sort((a, b) => {
        if (
          a.key.account.toLowerCase() === playerEntity?.toLowerCase() &&
          Number(a.value.value) !== playerRep
        ) {
          setMyRep(Number(a.value.value));
        }

        return Number(b.value.value) - Number(a.value.value);
      }),
    [rep, playerEntity, playerRep]
  );

  return {
    playerRep,
    reputation: sorted,
  };
}
