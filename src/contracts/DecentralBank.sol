// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "DecentralBank";
    address public owner;
    Tether public tether;
    RWD public rwd;


    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    // ETH address has staked or not
    mapping(address => bool) public hasStaked;
    // token with particular address is staked or not
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // staking function
    function depositTokens(uint _amount) public {

        // require staking amount to b greater then zero
        require(_amount > 0, 'amount cannot be 0');

        // transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // Update staking Balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update stakin balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // unstake tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        // require the amount to b greater than zero
        require(balance > 0, 'staking balance cannot be less than zero');

        // transfer the tokens to the specified contract address from our bank
        tether.transfer(msg.sender, balance);

        // reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking statue
        isStaking[msg.sender] = false;
    }

     // Issue rewards
    function issueTokens() public {
        // require the owner to issue tokens only
        require(msg.sender == owner, 'caller must be the owner');

          for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9;
            if(balance < 0) {
                rwd.transfer(recipient, balance);
            }
          }
    }
      
}




// Implementation Features: We want our investers to come in they can deposit their tokens and then they are staking  these tokens once they are deposited and they can receive rewards3.