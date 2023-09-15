import { ethers } from "hardhat";

async function main() {
  const token1 = "0xDF7b60755f0bdc1Ebb49bf8105ad389d04b90e7E";
  const token2 = "0xD40Bf8b78dc82Af1d492E5aa08A52687C34883E1";

  const swap = await ethers.deployContract("TokenSwap", [token1, token2]);

  await swap.waitForDeployment();

  console.log("Swap deployed to", swap.target);
  //0x5620Ecce0fA7eBc7a70Fa421cE8d5A851130F075
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});