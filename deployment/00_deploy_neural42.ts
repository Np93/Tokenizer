import * as dotenv from "dotenv";
dotenv.config();

import hre from "hardhat"; // <- importe HRE (recommandé)

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const addr = await deployer.getAddress();
  const bal  = await hre.ethers.provider.getBalance(addr); // <- v6: via provider

  console.log("Deployer:", addr);
  console.log("Balance (tBNB):", hre.ethers.formatEther(bal));

  const Neural42 = await hre.ethers.getContractFactory("Neural42");
  const token = await Neural42.deploy();

  // ethers v6 + hardhat-ethers v6
  await token.waitForDeployment();

  const tokenAddr = await token.getAddress(); // ou: token.target
  console.log("Neural42 déployé à:", tokenAddr);

  const totalSupply = await token.totalSupply();
  console.log("Total supply:", totalSupply.toString());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});