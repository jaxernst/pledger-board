// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { Commitment, CommitmentData, ProofRequirement, Deadline, ProofSubmission, ProofSubmissionData } from "../codegen/Tables.sol";
import { CommitmentStatus, ProofType } from "../codegen/Types.sol";

contract CommitmentCompletionSystem is System {
  modifier onlyCreator(bytes32 id) {
    require(Commitment.get(id).owner == _msgSender(), "Not the owner");
    _;
  }

  function markComplete(bytes32 id) public onlyCreator(id) {
    CommitmentData memory commitment = Commitment.get(id);  
    require(ProofRequirement.get(id) == ProofType.None, "This commitment requires proof for completion");

    uint deadline = Deadline.get(id);
    if (deadline > 0 && block.timestamp > deadline) {
      commitment.status = CommitmentStatus.Failed;
      Commitment.set(id, commitment);
      return;
    }

    commitment.status = CommitmentStatus.Complete;
    Commitment.set(id, commitment);
  }

  function completeWithProof(bytes32 id, string memory proofUri) public onlyCreator(id) {
    CommitmentData memory commitment = Commitment.get(id);
    require(ProofRequirement.get(id) == ProofType.Photo, "Commitment type not allowed");
    require(commitment.status == CommitmentStatus.Active, "Commitment not active");
    
    uint deadline = Deadline.get(id);
    require(deadline > 0, "No Deadline set");

    if (block.timestamp > deadline) {
      commitment.status = CommitmentStatus.Failed;
      Commitment.set(id, commitment);
      return;
    }

    ProofSubmission.set(id, ProofSubmissionData({
      uri: proofUri,
      submissionTime: block.timestamp
    }));

    commitment.status = CommitmentStatus.Complete;
    Commitment.set(id, commitment);
  }
}