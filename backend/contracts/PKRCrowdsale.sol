// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./PKR.sol";

contract PKRCrowdsale {
    address payable admin;

    PKR public pkrContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    uint256 public openingTime;
    uint256 public closingTime;

    modifier onlyWhileOpen {
        require(block.timestamp >= openingTime && block.timestamp <= closingTime,
        "Token sale is not open");
        _;
    }

    event Sell(address _buyer, uint256 _amount);
    constructor(PKR _pkrContract, uint256 _tokenPrice, uint256 _openingTime, uint256 _closingTime) {
        require(_openingTime >= block.timestamp, "Opening time must be after block creation");
        require(_closingTime >= _openingTime, "Closing time should be after opening time");

        // Assign an admin, which is an external address that will have special
        // priviledge other accounts won't have (e.g. End the token sale)
        admin = payable(msg.sender);

        // Assign Token Contract to the crowd sale
        pkrContract = _pkrContract;
        // Token Price: How much Eth will it costs to sell our token
        tokenPrice = _tokenPrice;

        // set the opening and closing time
        openingTime = _openingTime;
        closingTime = _closingTime;
    }

    function hasClosed() public view returns (bool) {
        return block.timestamp >= closingTime;
    }

    function buyTokens(uint256 _numberOfTokens) public payable onlyWhileOpen{
        require(msg.value == multiply(_numberOfTokens, tokenPrice), "Amount should be sent that equals the value of PKR");
        // check if pkrContract has enough balance
        require(pkrContract.balanceOf(address(this)) >= _numberOfTokens, "No enough PKR tokens");
        // Require a successful transfer of tokens 
        require(pkrContract.transfer(msg.sender, _numberOfTokens));
        // keep track of how many tokens are sold
        tokensSold += _numberOfTokens;
        // transfer the value of pkrs to the admin account
        admin.transfer(msg.value);
        // trigger the sell event
        emit Sell(msg.sender, _numberOfTokens);
    }

    // This function will ensure a safe mathematical operation 
    // And prevent variable overflow
    function multiply(uint x, uint y) internal pure returns(uint z){
        require(y == 0 || (z = x * y) / y == x);
    }

    function endSale() public {

        // Require only admin can end the sale
        require(msg.sender == admin, 'Only Admin can end the sale');

        // Transfer remaining tokens back to admin
        require(pkrContract.transfer(admin, pkrContract.balanceOf(address(this))));

        // Destroy/Deactivate the contract
        selfdestruct(payable(admin));

    }

}
