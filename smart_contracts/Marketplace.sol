// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "./Trade.sol";

contract Marketplace {

    address aiProcessor;

    mapping(address=>address) public activeTrades;

    constructor(address _aiProcessor) {
        aiProcessor = _aiProcessor;
    }

    function startTrade(address _seller,address _buyer,uint256 _amount) public {
        address tradeContractAddress = address(new Trade(_seller,_buyer,_amount,address(this)));
        activeTrades[msg.sender] = tradeContractAddress;
    }

    function verifyTransfer(address smartContractAddress) public {
        require(msg.sender == aiProcessor,"Only Ai processor can call this function");
        ITrade(smartContractAddress).verifyTrade();
    }

}