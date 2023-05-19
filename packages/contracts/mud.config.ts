import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    Commitment: "bool",
    Description: {
      schema: "string",
    },
    Deadline: {
      schema: "uint32",
    },
    Active: "bool",
  },
});
