const { expect } = require("chai");
const { ethers } = require("hardhat");

// constants
const TOTAL_SUPPLY = 25000;
const TOKEN_PRICE = 100;

describe("PKRCrowdslae", async function () {
  let pkrCrowdsale;
  let pkr;
  let [deployer, acc1, acc2, acc3] = await ethers.getSigners();

  beforeEach(async function () {
    const PKR = await ethers.getContractFactory("PKR");
    pkr = await PKR.deploy(TOTAL_SUPPLY);

    const PKRCrowdsale = await ethers.getContractFactory("PKRCrowdsale");
    pkrCrowdsale = await PKRCrowdsale.deploy(pkr.address, TOKEN_PRICE);
  });

  describe("Deployment defaults", function () {
    it("Check if right token price is set", async function () {
      expect(await pkrCrowdsale.tokenPrice()).to.equal(TOKEN_PRICE);
    });
  });

  describe("Selling tokens", function () {
    it("Selling 2 tokens to acc1", async function () {
      const tokens = 2;
      const value = tokens * TOKEN_PRICE;
      await pkr.transfer(pkrCrowdsale.address, 25);
      await pkrCrowdsale.connect(acc1).buyTokens(tokens, { value });
      expect(await pkrCrowdsale.tokensSold()).to.equal(tokens);
    });
  });

  //   describe("Testing the events", function () {
  //     // test the sell event
  //   });
});
