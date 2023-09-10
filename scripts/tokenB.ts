import { ethers } from "hardhat";

async function main() {
   
  
    const factoryB = await ethers.deployContract("tokenB");
      
  
    await factoryB.waitForDeployment();

    //console.log(factory);
    console.log(`factory deployed to ${factoryB.target}`)


    const amount = ethers.parseEther('150')

    const addrA = "0xA01a35008951beCaC133303Bff7C49968Da5b540"

    await factoryB.mint(addrA, amount)

}
  




main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });