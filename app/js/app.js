const Web3 = require("web3");
const Promise = require("bluebird");
const truffleContract = require("truffle-contract");
const $ = require("jquery");
require("file-loader?name=../index.html!../index.html");
// Not to forget our built contract
const metaCoinJson = require("../../build/contracts/MetaCoin.json");
if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet/Metamask provider.
    window.web3 = new Web3(web3.currentProvider);
} else {
    // Your preferred fallback.
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}
const MetaCoin = truffleContract(metaCoinJson);
MetaCoin.setProvider(web3.currentProvider);
window.addEventListener('load', function() {
    return web3.eth.getAccounts()
        .then(accounts => {
            if (accounts.length == 0) {
                $("#balance").html("N/A");
                throw new Error("No account with which to transact");
            }
            window.account = accounts[0];
            account=accounts[0];
           console.log("Account:", window.account);
           console.log("Check");
                  return web3.eth.net.getId();
        })
        .then(network => {
            console.log("Network:", network.toString(10));
            return MetaCoin.deployed();
        })
        .then(() => $("#send").click(sendCoin))
        .then(() => $("#split").click(split))
        .catch(console.error);
});
const sendCoin = function() {
    console.log("button clicked");
var contractAddress;
console.log("after contractAddress");
return MetaCoin.deployed()
    .then(deployed=> {
        console.log("after deployed");
             contractAddress=deployed.address;
             web3.eth.sendTransaction(
            {from:window.account,
            to:contractAddress,
            value: $("input[name='amount']").val(), 
            data: ""
                }, function(err, transactionHash,result) {
          if (!err)
            console.log(transactionHash + " success");  
            console.log("result:"+$("input[name='amount']").val());
        }
       );
});
};

const split = function() {
    console.log("split clicked");
return MetaCoin.deployed()
    .then(deployed=> {
        console.log("address1:"+$("input[name='address1']").val());
        console.log("address2:"+$("input[name='address2']").val());
        deployed.sendSplits.call($("input[name='address1']").val(),$("input[name='address2']").val())
      
});
};