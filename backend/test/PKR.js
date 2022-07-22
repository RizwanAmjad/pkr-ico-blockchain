const { expect } = require("chai");
const { ethers } = require("hardhat");

// constants
const TOTAL_SUPPLY = 25000;

describe("PKR", async function () {
  let pkr;
  let [deployer, acc1, acc2, acc3] = await ethers.getSigners();

  beforeEach(async function () {
    const PKR = await ethers.getContractFactory("PKR");
    pkr = await PKR.deploy(TOTAL_SUPPLY);
  });

  describe("Testing Initials", async function () {
    it("Test the total supply to be right", async function () {
      expect(await pkr.totalSupply()).to.equal(TOTAL_SUPPLY);
    });

    it("Test the initial balance of deployer to be equal to the totalSupply", async function () {
      expect(await pkr.balanceOf(deployer.address)).to.equal(TOTAL_SUPPLY);
    });
  });

  describe("Testing Transfers", async function () {
    it("Test the transfer of 25 tokens more than deployer's balance", async function () {
      expect(
        pkr.transfer(acc1.address, TOTAL_SUPPLY + 2500)
      ).to.be.rejectedWith("Not enough balance");
    });

    it("Test the transfer of 25 tokens to acc1 from deployer", async function () {
      await pkr.transfer(acc1.address, 2500);

      const deployerBalance = await pkr.balanceOf(deployer.address);
      const acc1Balance = await pkr.balanceOf(acc1.address);

      expect(deployerBalance).to.equal(TOTAL_SUPPLY - 2500);

      expect(acc1Balance).to.equal(2500);
    });
  });

  // describe("Testing events", async function () {
  //   it("Checking if Transfer event is emitted", async function () {
  //     expect(await pkr.transfer(acc1.address, 2500))
  //       .to.emit("Transfered")
  //       .withArgs(deployer.address, acc2.address, 500);
  //   });
  // });

  describe("Testing approval", async function () {
    it("Checking if Transfer is approved", async function () {
      // TODO: Write these test cases, for approval and transfer from
      expect(await pkr.transfer(acc1.address, 2500))
        .to.emit("Transfered")
        .withArgs(deployer.address, acc2.address, 500);
    });
  });
});
