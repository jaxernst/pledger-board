// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

import { IBaseWorld } from "@latticexyz/world/src/interfaces/IBaseWorld.sol";

import { ICommitmentAttestationSystem } from "./ICommitmentAttestationSystem.sol";
import { ICommitmentBuilderSystem } from "./ICommitmentBuilderSystem.sol";
import { ICommitmentCompletionSystem } from "./ICommitmentCompletionSystem.sol";
import { ICommitmentRatingSystem } from "./ICommitmentRatingSystem.sol";

/**
 * The IWorld interface includes all systems dynamically added to the World
 * during the deploy process.
 */
interface IWorld is
  IBaseWorld,
  ICommitmentAttestationSystem,
  ICommitmentBuilderSystem,
  ICommitmentCompletionSystem,
  ICommitmentRatingSystem
{

}
