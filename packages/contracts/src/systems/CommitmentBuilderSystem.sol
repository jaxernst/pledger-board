// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { addressToEntity } from "../util/addressToEntity.sol";
import { Description,  Commitment, CommitmentData, FirstCommitment, SupportTokens, AttestationTokens } from "../codegen/Tables.sol";
import { CommitmentStatus } from "../codegen/Types.sol";

contract CommitmentBuilderSystem is System {

  function createCommitment(bytes32 id) public {
    Commitment.set(id, CommitmentData({
      owner: _msgSender(),
      creationTimestamp: block.timestamp,
      status: CommitmentStatus.Active
    }));

    // Users earn 10 support and attestation tokens for their first commitment
    bool firstCommitment = FirstCommitment.get(addressToEntity(_msgSender()));
    if (firstCommitment) {
      SupportTokens.set(_msgSender(), 10);
      AttestationTokens.set(_msgSender(), 10);
    }
  }

  function addDescription(bytes32 entity, string memory desc) public returns (bytes32) {
    Description.set(entity, desc);
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