

const Web3 = require("web3");
const fs = require('fs');
var Tx = require("ethereumjs-tx").Transaction
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545/'))
var json = require('../build/contracts/Tellor.json');

solution = process.argv[2]
apiId = [process.argv[3] - 0,process.argv[4] - 0,process.argv[5] - 0,process.argv[6] - 0,process.argv[7] - 0]
value = [process.argv[8] - 0,process.argv[9] - 0,process.argv[10] - 0,process.argv[11] - 0,process.argv[12] - 0]


var address = process.argv[13];
var abi = json.abi;
var account = process.argv[14];
var privateKey = new Buffer(process.argv[15], 'hex');
console.log(apiId)
console.log(value)
let myContract = new web3.eth.Contract(abi,address);
let data = myContract.methods['submitMiningSolution(string,uint256[5],uint256[5])'](solution,apiId,value).encodeABI();

//web3.eth.sendTransaction({to: oracle.address,from:accounts[0],gas:7000000,data:oracle2.methods.requestData(api,0,0).encodeABI()});

web3.eth.getTransactionCount(account, function (err, nonce) {
     var tx = new Tx({
      nonce: nonce,
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      gasLimit: 10000000,
      to: address,
      value: 0,
      data: data,
    });
    tx.sign(privateKey);

    var raw = '0x' + tx.serialize().toString('hex');
    web3.eth.sendSignedTransaction(raw).on('transactionHash', function (txHash) {
      // }).on('receipt', function (receipt) {
      //     console.log("receipt:" + receipt);
      // }).on('confirmation', function (confirmationNumber, receipt) {
      //     //console.log("confirmationNumber:" + confirmationNumber + " receipt:" + receipt);
      // }).on('error', function (error) {
    });
  });
