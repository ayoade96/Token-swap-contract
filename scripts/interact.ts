import { ethers, network } from "hardhat";

// NOTE:
// DO NOT RUN THE CODE ALL AT ONCE
// COMMENT ALL AND ONLY UNCOMMENT THE ONES YOU NEED PER TIME

async function main() {
  const ownerAddr = "0xA01a35008951beCaC133303Bff7C49968Da5b540";
  const owner = await ethers.getImpersonatedSigner(ownerAddr);
  // const [owner] = await ethers.getSigners();

  // await network.provider.send("hardhat_setBalance", [
  //   ownerAddr,
  //   "0x2B1FEF6E2ED3B900"
  // ])

  // contract addresses
  
  const tokenA = "0xDF7b60755f0bdc1Ebb49bf8105ad389d04b90e7E";
  const tokenB = "0xD40Bf8b78dc82Af1d492E5aa08A52687C34883E1";
  const swap = "0x5620Ecce0fA7eBc7a70Fa421cE8d5A851130F075";

  const tokenAContract = await ethers.getContractAt("Token1", tokenA);
  const tokenBContract = await ethers.getContractAt("Token2", tokenB);
  const swapContract = await ethers.getContractAt("TokenSwap", swap);

  // checking balances before

  const tokenAbalance = ethers.formatEther(
    await tokenAContract.balanceOf(owner)
  );
  const tokenBbalance = ethers.formatEther(
    await tokenBContract.balanceOf(owner)
  );
  const reserveA = ethers.formatEther(await swapContract.reserveA());
  const reserveB = ethers.formatEther(await swapContract.reserveB());
  console.log({
    tokenAbalance: tokenAbalance,
    tokenBbalance: tokenBbalance,
    reserveA: reserveA,
    reserveB: reserveB,
  });

  // approving allowances

  const allowance = ethers.parseEther("50000000000000000");

  await tokenAContract.connect(owner).approve(swap, allowance);
  await tokenBContract.connect(owner).approve(swap, allowance);

  // adding liquidity

  const addTokenA = ethers.parseEther("200");
  const addTokenB = ethers.parseEther("500");

  const liquidity = await swapContract
    .connect(owner)
    .addLiquidity(addTokenA, addTokenB);
  await liquidity.wait();

  // withdrawing liquidity

  const removeTokenA = ethers.parseEther("50");
  const removeTokenB = ethers.parseEther("100");

  const withdraw = await swapContract
    .connect(owner)
    .withdrawLiquidity(removeTokenA, removeTokenB);
  await withdraw.wait();

  // swapping A to B and checking amount of B out

  const amountA = ethers.parseEther("10");

  console.log({
    amountBOut: ethers.formatEther(
      await swapContract.connect(owner).getAmountOut(amountA)
    ),
  });

  const swapAtoB = await swapContract.connect(owner).swapAToB(amountA);
  await swapAtoB.wait();

  // swapping B to A and checking amount of A in

  const amountB = ethers.parseEther("20");

  console.log({
    amountAIn: ethers.formatEther(
      await swapContract.connect(owner).getAmountIn(amountB)
    ),
  });

  const swapBtoA = await swapContract.connect(owner).swapBToA(amountB);
  await swapBtoA.wait();

  // checking balances after

  const tokenAbalance2 = ethers.formatEther(
    await tokenAContract.balanceOf(owner)
  );
  const tokenBbalance2 = ethers.formatEther(
    await tokenBContract.balanceOf(owner)
  );
  const reserveA2 = ethers.formatEther(await swapContract.reserveA());
  const reserveB2 = ethers.formatEther(await swapContract.reserveB());
  console.log({
    tokenAbalance: tokenAbalance2,
    tokenBbalance: tokenBbalance2,
    reserveA: reserveA2,
    reserveB: reserveB2,
  });

  // to check contract balances which should be same with the reserves

  // const contractAbal = ethers.formatEther(await tokenAContract.balanceOf(swap));
  // const contractBbal = ethers.formatEther(await tokenBContract.balanceOf(swap));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});