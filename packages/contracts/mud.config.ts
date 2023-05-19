import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    CommitmentStatus: ["Active", "Complete", "Failed"],
    ProofType: ["None", "Photo"],
  },
  tables: {
    Commitment: {
      schema: {
        owner: "address",
        creationTimestamp: "uint256",
        status: "CommitmentStatus",
      },
    },
    FirstCommitment: "bool",
    Description: "string",
    Deadline: "uint32",
    ProofRequirement: "ProofType",

    // Game tokens
    SupportTokens: {
      keySchema: {
        account: "address",
      },
      schema: "uint32",
    },
    AttestationTokens: {
      keySchema: {
        account: "address",
      },
      schema: "uint32",
    },
  },
});
