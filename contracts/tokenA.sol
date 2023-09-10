// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract tokenA is ERC20, Ownable {

    constructor() ERC20("Token", "TKA") {}

    function mint(address to, uint amount) public onlyOwner {
        _mint(to, amount);
    }
}