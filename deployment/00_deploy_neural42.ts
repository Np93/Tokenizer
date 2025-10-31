// Charge les variables d'environnement depuis .env
import * as dotenv from "dotenv";
dotenv.config();

import hre from "hardhat"; // <- importe HRE (recommandé)

async function main() {
  // Récupère la liste des signers configurés (dérivés de PRIVATE_KEY si présent).
  const [deployer] = await hre.ethers.getSigners();

  const addr = await deployer.getAddress();
  // En Ethers v6, on passe par le provider pour lire le solde
  const bal  = await hre.ethers.provider.getBalance(addr); // <- v6: via provider

  console.log("Deployer:", addr);
  console.log("Balance (tBNB):", hre.ethers.formatEther(bal));

  // Récupère la fabrique de contrat pour "Neural42".
  const Neural42 = await hre.ethers.getContractFactory("Neural42");
  // Déploie le contrat sans arguments de constructeur.
  const token = await Neural42.deploy();

  // ethers v6 + hardhat-ethers v6
  await token.waitForDeployment();

  // Adresse du contrat déployé
  const tokenAddr = await token.getAddress(); // ou: token.target
  console.log("Neural42 déployé à:", tokenAddr);

  // Lecture d'un état du contrat pour vérifier qu'il répond
  const totalSupply = await token.totalSupply();
  console.log("Total supply:", totalSupply.toString());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});