// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// constants
const TOTAL_SUPPLY = 25000;
const TOKEN_PRICE = 100000000000000;
const TIME_TO_START_CROWDSALE = 60;
const TIME_TO_CROWDSALE_END = 60 + 24 * 60 * 60; // 1 day

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  const PKR = await hre.ethers.getContractFactory("PKR");
  const pkr = await PKR.deploy(TOTAL_SUPPLY);

  const PKRCrowdsale = await hre.ethers.getContractFactory("PKRCrowdsale");
  const pkrCrowdsale = await PKRCrowdsale.deploy(
    pkr.address,
    TOKEN_PRICE,
    parseInt(Date.now() / 1000) + TIME_TO_START_CROWDSALE,
    parseInt(Date.now() / 1000) + TIME_TO_CROWDSALE_END
  );

  await lock.deployed();

  console.log("Lock with 1 ETH deployed to:", lock.address);
  console.log("PKR deployed at ", pkr.address);
  saveFrontendFiles(pkr, "PKR");
  console.log("PKRCrowdsale deployed at ", pkrCrowdsale.address);
  saveFrontendFiles(pkrCrowdsale, "PKRCrowdsale");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../src/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
