// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { Commitment, CommitmentData, ProofRequirement, Deadline } from "../codegen/Tables.sol";
import { CommitmentStatus, ProofType } from "../codegen/Types.sol";

contract CommitmentCheckInSystem is System {
  function markComplete(bytes32 id) public {
    CommitmentData memory commitment = Commitment.get(id);
    require(commitment.owner == _msgSender(), "Only the commitment owner can mark complete");
    require(ProofRequirement.get(id) == ProofType.None, "This commitment requires proof for completion");
    
    commitment.status = CommitmentStatus.Complete;
    Commitment.set(id, commitment);
  }

  function markCompleteWithProof(bytes32 id, string memory proofUri) public {

  }
}