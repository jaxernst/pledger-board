// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { Counter } from "../codegen/Tables.sol";
import { CommitmentDescriptor } from "../codegen/Tables.sol";
import { Commitment } from "../codegen/Tables.sol";

contract CommitmentCreationSystem is System {
  function addDescription(uint32 entity, string memory desc) public returns (uint32) {
    CommitmentDescriptor.set(bytes32(uint256(entity)), desc);
    return entity;
  }

  /*function addDeadline(uint32 entity, uint32 deadline) public returns (uint32) {
    uint32 counter = CommitmentDeadline.set(entity, deadline);
    return entity;
  }*/

  /*function addSubmissionUri(uint32 entity, string memory uri) public returns (uint32) {
    uint32 counter = CommitmentDescription.set(entity, uri);
    return entity;
  }*/
}
