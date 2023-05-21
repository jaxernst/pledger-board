import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    CommitmentStatus: ["Inactive", "Active", "Complete", "Failed"],
    ProofType: ["None", "Photo"],
    ProgressionZone: ["Rating", "Sponsorhip", "Attestation"],
  },
  tables: {
    Commitment: {
      schema: {
        owner: "address",
        activationTimestamp: "uint256",
        status: "CommitmentStatus",
      },
    },
    TaskDescription: {
      schema: "string",
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
    ProofDescription: {
      schema: "string",
    },
    Ratings: {
      keySchema: {
        commitmentId: "bytes32",
        account: "address",
      },
      schema: "uint8",
    },
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
});
