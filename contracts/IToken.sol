

// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.1;

interface IToken {
    function mint(address to, uint amount) external;
      function balanceOf(address _owner) external view returns (uint256 balance);
}