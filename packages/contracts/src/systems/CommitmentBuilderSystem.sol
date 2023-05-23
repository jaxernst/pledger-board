// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { addressToEntity } from "../util/addressToEntity.sol";
import { TaskDescription,  Commitment, CommitmentData, ProofDescription, ProofRequirement, Deadline, AttestationPeriod } from "../codegen/Tables.sol";
import { CommitmentStatus, ProofType } from "../codegen/Types.sol";

contract CommitmentBuilderSystem is System {
  modifier preActivation(bytes32 id) {
    require(Commitment.get(id).status == CommitmentStatus.Inactive, "Commitment already active");
    _;
  }

  modifier onlyCreator(bytes32 id) {
    require(Commitment.get(id).owner == _msgSender(), "Not the owner");
    _;
  }

  function registerCommitment() public returns (bytes32) {
    bytes32 id = getUniqueEntity();
    Commitment.set(id, CommitmentData({
      owner: _msgSender(),
      activationTimestamp: 0,
      status: CommitmentStatus.Inactive
    }));
    return id;
  }

  function addDescription(bytes32 id, string memory desc) public preActivation(id) onlyCreator(id) {
    TaskDescription.set(id, desc);
  }

  function addDeadline(bytes32 id, uint32 deadline) public preActivation(id) onlyCreator(id) {
    require(deadline > block.timestamp, "Deadline must be in the future");
    Deadline.set(id, deadline);
  }

  function addPhotoSubmissionRequirement(bytes32 id, string memory proofDescription) public preActivation(id) onlyCreator(id) {
    ProofRequirement.set(id, ProofType.Photo);
    ProofDescription.set(id, proofDescription);
  }

  function makeAttestable(bytes32 id, uint32 attestionPeriodDuration) public preActivation(id) onlyCreator(id) {
    AttestationPeriod.set(id, attestionPeriodDuration);
  }

  function activate(bytes32 id) public onlyCreator(id) {
    require(Commitment.get(id).status == CommitmentStatus.Inactive, "Commitment already active");
    Commitment.set(id, CommitmentData({
      owner: _msgSender(),
      activationTimestamp: block.timestamp,
      status: CommitmentStatus.Active
    }));
  }

  function registrationHelper(string memory desc, uint32 deadline, string memory proofDescription, uint32 attestionPeriodDuration) public returns (bytes32) {
    bytes32 commitmentId = registerCommitment();
    addDescription(commitmentId, desc);
    addDeadline(commitmentId, deadline);
    addPhotoSubmissionRequirement(commitmentId, proofDescription);
    makeAttestable(commitmentId, attestionPeriodDuration);
    activate(commitmentId);
    return commitmentId;
  }
}