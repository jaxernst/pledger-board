// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { Commitment, CommitmentData, Deadline, Ratings, RatingSum, ProofSubmission } from "../codegen/Tables.sol";
import { CommitmentStatus, ProofType } from "../codegen/Types.sol";

function isStringEmpty(string memory str) pure returns (bool) {
    return bytes(str).length == 0;
}

contract CommitmentRatingSystem is System {
  // Commitments can only be rate before the deadline and before the owner
  // has submitted proof of completion
  function rate(bytes32 id, uint8 rating) public {
    CommitmentData memory commitment = Commitment.get(id);
    // require(commitment.owner != _msgSender(), "Owner cannot rate");
    require(Deadline.get(id) > block.timestamp, "Deadline passed");
    require(isStringEmpty(ProofSubmission.get(id).uri), "Rating period closed");
    require(Ratings.get(id, _msgSender()) == 0, "Already rate this commitment");
    require(rating <= 100, "Rating must be between 0 and 100");

    Ratings.set(id, _msgSender(), rating);
    uint32 ratingSum = RatingSum.get(id);
    RatingSum.set(id, ratingSum + rating);
  }
}