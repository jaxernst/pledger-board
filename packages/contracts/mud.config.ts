import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    Commitment: "bool",
    Pledge: "bool",
    CommitmentDescriptor: {
      keySchema: {
        // These commitment that this describes
        commitment: "bytes32",
      },
      schema: "string",
    },
  },
});
