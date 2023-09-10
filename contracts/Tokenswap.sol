// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract Tokenswap {
    IERC20 public tokenA;
    IERC20 public tokenB;
    uint public reserveA;
    uint public reserveB;

/*struct LiquidityProvider {
    uint AmountA;
    uint AmountB;
}
mapping(address => LiquidityProvider) liquidityprovider;*/

 constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

// Function to swap tokenA for tokenB
    function swapAToB(uint256 amountA) external {
        require(amountA > 0, "Amount must be greater than 0");
        uint256 amountB = calculateBFromA(amountA);
        require(reserveB >= amountB, "Not enough tokenB in the pool");
        reserveA += amountA;
        reserveB -= amountB;
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transfer(msg.sender, amountB);
    }

      // Function to swap tokenB for tokenA
    function swapBToA(uint256 amountB) external {
        require(amountB > 0, "Amount must be greater than 0");
        uint256 amountA = calculateAFromB(amountB);
        require(reserveA >= amountA, "Not enough tokenA in the pool");
        reserveB += amountB;
        reserveA -= amountA;
        tokenB.transferFrom(msg.sender, address(this), amountB);
        tokenA.transfer(msg.sender, amountA);
    }

     // Calculate the amount of tokenB to receive when swapping tokenA
    function calculateBFromA(uint256 amountA) public view returns (uint256) {
        require(amountA > 0, "Amount must be greater than 0");
        return (reserveA * reserveB) / (reserveA + amountA);
    }

    // Calculate the amount of tokenA to receive when swapping tokenB
    function calculateAFromB(uint256 amountB) public view returns (uint256) {
        require(amountB > 0, "Amount must be greater than 0");
        return (reserveA * reserveB) / (reserveB + amountB);
    }

/*function addLiquidity(uint amountA, uint amountB) external {
IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);
reserveA += amountA;
reserveB += amountB;

LiquidityProvider storage provider = liquidityprovider[msg.sender];
  provider.AmountA += amountA;
  provider.AmountB += amountB;
}*/

}