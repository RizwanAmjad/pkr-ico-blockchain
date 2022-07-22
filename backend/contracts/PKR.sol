// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PKR {
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    string public name = "Pakistani Rupee";
    string public symbol = "Rs";
    uint public decimals = 2;

    event Transfer(
        address indexed _to,
        address indexed _from,
        uint256 _value
    );

    event Approval(
        address indexed _owner, 
        address indexed _spender,
        uint256 _value
    );
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balanceOf[msg.sender]=_initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns(bool success) {
        require(balanceOf[msg.sender]>=_value, "Not enough balance");
        // debit the sende and credit the reciever
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        // emit the transfer event
        emit Transfer(msg.sender, _to, _value);
        // return a success value
        return true;
    }

    function approve(address _spender, uint256 _value) public returns(bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);  
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        // require _from has enough NZT
        require(_value <= balanceOf[_from]);

        // require allowance to have enough NZT funds
        require(_value <= allowance[_from][msg.sender]);
        
        // update balances
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        
        // update allowance
        allowance[_from][msg.sender] -= _value;

        // emit a Transfer event
        emit Transfer(_from, _to, _value);

        // return a boolean
        return true;
    }
}