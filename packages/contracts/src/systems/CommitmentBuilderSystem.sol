// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { addressToEntity } from "../util/addressToEntity.sol";
import { TaskDescription,  Commitment, CommitmentData, ProofDescription, ProofURI, Deadline } from "../codegen/Tables.sol";
import { CommitmentStatus } from "../codegen/Types.sol";

contract CommitmentBuilderSystem is System {
  modifier preActivation(bytes32 id) {
    require(Commitment.get(id).status == CommitmentStatus.Inactive, "Commitment already active");
    _;
  }

  modifier onlyCreator(bytes32 id) {
    require(Commitment.get(id).owner == _msgSender(), "Not the owner");
    _;
  }

  function createCommitment(bytes32 id) public {
    Commitment.set(id, CommitmentData({
      owner: _msgSender(),
      activationTimestamp: 0,
      status: CommitmentStatus.Inactive
    }));
  }

  function addDescription(bytes32 id, string memory desc) public preActivation(id) onlyCreator(id) {
    TaskDescription.emitEphemeral(id, desc);
  }

  function addDeadline(bytes32 id, uint32 deadline) public preActivation(id) onlyCreator(id) {
    require(deadline > block.timestamp, "Deadline must be in the future");
    Deadline.set(id, deadline);
  }

  function addSubmissionArtifacts(bytes32 id, string memory proofDescription, string memory uri) public preActivation(id) onlyCreator(id) {
    ProofURI.set(id, uri);
    ProofDescription.emitEphemeral(id, proofDescription);
  }

  function activate(bytes32 id) public onlyCreator(id) {
    require(Commitment.get(id).status == CommitmentStatus.Inactive, "Commitment already active");
    Commitment.set(id, CommitmentData({
      owner: _msgSender(),
      activationTimestamp: block.timestamp,
      status: CommitmentStatus.Active
    }));
  }
}