import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    CommitmentStatus: ["Inactive", "Active", "Complete", "Finalized", "Failed"],
    ProofType: ["None", "Photo"],
  },
  tables: {
    Commitment: {
      schema: {
        owner: "address",
        activationTimestamp: "uint256",
        status: "CommitmentStatus",
      },
    },

    FirstCommitment: "bool",
    Deadline: "uint32",
    ProofRequirement: "ProofType",
    ProofSubmission: {
      schema: {
        submissionTime: "uint256",
        uri: "string",
      },
    },

    TaskDescription: {
      schema: "string",
    },
    ProofDescription: {
      schema: "string",
    },

    RatingSum: "uint32",
    Ratings: {
      keySchema: {
        commitmentId: "bytes32",
        account: "address",
      },
      schema: "uint8",
    },

    AttestationPeriod: "uint32",
    AttestationValue: "uint32",
    Attestations: {
      keySchema: {
        commitmentId: "bytes32",
        account: "address",
      },
      schema: "bool",
    },

    Reputation: {
      keySchema: {
        account: "address",
      },
      schema: "uint32",
    },
  },
  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
    },
  ],
});
