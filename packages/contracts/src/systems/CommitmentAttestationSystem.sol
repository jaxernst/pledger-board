// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { Commitment, Deadline, Ratings, Attestations, AttestationPeriod, AttestationValue, Reputation, ProofSubmission, ProofSubmissionData } from "../codegen/Tables.sol";
import { CommitmentStatus, ProofType } from "../codegen/Types.sol";

function isStringEmpty(string memory str) pure returns (bool) {
    return bytes(str).length == 0;
}

// Users who rated a commitment can attest to the validity of the submitted proof.
// Attesting to a proof converts the rating into reputation for the commitment creator
contract CommitmentAttestationSystem is System {
  function attestToProof(bytes32 id) public {
    uint8 senderRating = Ratings.get(id, _msgSender());
    uint submissionTime = ProofSubmission.get(id).submissionTime;

    require(Commitment.get(id).status == CommitmentStatus.Complete, "Commitment not complete");
    require(submissionTime != 0, "No proof submitted");
    require(senderRating > 0, "Sender has not rated commitment");
    require(Attestations.get(id, _msgSender()) == false, "Sender already attested");
 
    bool inAttestationPeriod = block.timestamp - submissionTime < AttestationPeriod.get(id);
    require(inAttestationPeriod, "Attestation period has ended");

    uint32 attestationValue = AttestationValue.get(id);
    AttestationValue.set(id, attestationValue + senderRating);
    Attestations.set(id, _msgSender(), true);
  }
}