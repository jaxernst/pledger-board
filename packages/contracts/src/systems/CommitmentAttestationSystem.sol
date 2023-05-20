// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { Commitment, CommitmentData, Deadline, Ratings, Attestations, Reputation, ProofSubmission } from "../codegen/Tables.sol";
import { CommitmentStatus, ProofType } from "../codegen/Types.sol";

function isStringEmpty(string memory str) pure returns (bool) {
    return bytes(str).length == 0;
}

// Users who rated a commitment can attest to the validity of the submitted proof.
// Attesting to a proof converts the rating into reputation for the commitment creator
contract CommitmentAttestationSystem is System {
  function attestToProof(bytes32 id) public {
    uint8 senderRating = Ratings.get(id, _msgSender());
    require(Commitment.get(id).status == CommitmentStatus.Complete, "Commitment not complete");
    require(!isStringEmpty(ProofSubmission.get(id).uri), "No proof submitted");
    require(senderRating > 0, "Sender has not rated commitment");

    Attestations.set(id, _msgSender(), true);

    address owner = Commitment.get(id).owner;
    uint32 ownerRep = Reputation.get(owner);
    uint32 senderRep = Reputation.get(_msgSender());
   
    Reputation.set(owner, ownerRep + senderRating);
    Reputation.set(_msgSender(), senderRep + 1);
  }

}