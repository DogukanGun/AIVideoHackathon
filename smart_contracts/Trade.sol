// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface ITrade {
    function verifyTrade() payable external;
    function missingAmount() view external returns(uint256);
}


contract Trade is ITrade {

    address seller;
    address buyer;
    address owner;
    uint256 amount;
    address marketplace;
    bool isFirstPaymentDone;
    bool isTradeVerified;


    constructor(address _seller,address _buyer,uint256 _amount,address _marketplace){
        seller = _seller;
        buyer = _buyer;
        owner = _seller;
        amount = _amount;
        marketplace = _marketplace;
    }

    receive() external payable {
        if(msg.sender == buyer){
            if(msg.value >= amount){
                isFirstPaymentDone = true;
            }else{
                revert("Amount is not enough");
            }
        }else{
            revert("Money must be sent by buyer");
        }
    }

    function missingAmount() view external returns(uint256) {
        if(address(this).balance > amount){
            return 0;
        }
        return amount - address(this).balance;
    }

    function verifyTrade() payable external {
        require(msg.sender == marketplace, "Only marketplace can verify this transfer");
        isTradeVerified = true;
        payable(seller).transfer(address(this).balance);
        owner = buyer;
    }

    function checkOwner() external view returns(address) {
        return owner;
    }

}