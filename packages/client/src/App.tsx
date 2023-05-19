import { useEntityQuery } from "@latticexyz/react";
import { CenteredInPage } from "./components/Util";
import { WelcomeMessage } from "./components/WelcomeMessage";
import { Has } from "@latticexyz/recs";
import { useMUD } from "./MUDContext";
import { CommitmentBuilder } from "./components/CommitmentBuilder";
import { CommitmentCard } from "./components/CommitmentCard";
import { Hud } from "./components/Hud";

export const App = () => {
  const {
    components: { Commitment, Description },
  } = useMUD();

  const commitmentIds = useEntityQuery([Has(Commitment), Has(Description)]);

  return (
    <>
      <Hud />
      <CenteredInPage>
        <WelcomeMessage />
        <CommitmentBuilder />
        <h2 className="mt-5 text-lg font-bold">Onchain Commitments</h2>
        <div className="flex flex-wrap gap-2">
          {commitmentIds.map((id) => (
            <CommitmentCard key={id} id={id} />
          ))}
        </div>
      </CenteredInPage>
    </>
  );
};
