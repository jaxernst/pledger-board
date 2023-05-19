import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { AutoColumn, AutoRow, CenteredInPage, DescriptionInput, SubmitButton } from "./UtilityComponents";
import { WelcomeMessage } from "./WelcomeMessage";
import { useState } from "react";


export const App = () => {

  const {
    components: { Counter, Commitment },
    systemCalls: { increment, createCommitment },
    network: { singletonEntity },
  } = useMUD();


  const [description, setDescription] = useState("I commit to...")

  

  return (<>
    <div className="background h-full bg-slate-300">
      <CenteredInPage>
        <WelcomeMessage />
        <DescriptionInput onInput={(v: string) => setDescription(v)}/>
    
        <AutoColumn>
          <AutoRow label="Add Verification Method">
            <AutoRow.Item>Add deadline</AutoRow.Item>
            <AutoRow.Item>Add alarm schedule</AutoRow.Item>
            <AutoRow.Item>Add interval schedule</AutoRow.Item>
          </AutoRow>

          <AutoRow label="Add confirmation artifacts">
            <AutoRow.Item>No proof</AutoRow.Item>
            <AutoRow.Item>Photo proof</AutoRow.Item>
            <AutoRow.Item>Zk proof</AutoRow.Item>
          </AutoRow>

          <AutoRow label="Add Verification Method">
            <AutoRow.Item>Self attestation</AutoRow.Item>
            <AutoRow.Item>Partner Attestation</AutoRow.Item>
            <AutoRow.Item>Community Attestation</AutoRow.Item>
            <AutoRow.Item>External Attestation</AutoRow.Item>
          </AutoRow>
        </AutoColumn>

        <SubmitButton onSubmit={() => createCommitment(description)}>Generate Commitment</SubmitButton>
      </CenteredInPage>
    </div>
</>)
}