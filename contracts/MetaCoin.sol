pragma solidity >=0.4.25 <0.6.0;

import "./ConvertLib.sol";
import "./SafeMath.sol";
// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
        using SafeMath for uint256;
       	mapping (address => uint) public balances;
	

		constructor() public payable{
			
		}
	

function() external payable {

        // Track that calling account deposited ether
        balances[msg.sender] += msg.value;
    }

function sendSplits(address payable alpha,address payable beta) external payable {

       uint256 amount=balances[msg.sender];
       require(amount > 0, "Zero Ether Check");
       require(alpha!= address(0x0) && beta!= address(0x0), "Valid Address Check");
  	   alpha.send(amount.div(2));
  	   beta.send(amount.div(2));
	}



}