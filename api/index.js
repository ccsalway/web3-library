global.Web3 = require('web3');
const config = require('../config.js');
const Account = require('./lib/wallet.js');
const chain = require('./lib/blockchain.js');
const Erc20 = require('./lib/erc20.js');
const txns = require('./lib/transactions.js');


async function main() {
    // chain
    chain.connect(`https://${config.network}.infura.io/v3/${config.projectId}`);

    let bn = await chain.blockNumber();
    console.log(`Block Number: ${bn}`);

    let b1 = await chain.getBlockByNumber(bn);
    console.log(b1);

    let b2 = await chain.getBlockByHash(b1.hash);
    console.log(b2);

    let gp = await chain.getGasPrice();
    console.log('Gas Price: ' + Web3.utils.fromWei(gp, 'ether') + ' ETH');

    // wallet
    let account = new Account(config.privateKey);

    let bal = await account.getBalance();
    console.log('Balance: ' + Web3.utils.fromWei(bal, 'ether') + ' ETH');

    let tc = await account.getTransactionCount();
    console.log(`Transaction Count: ${tc}`);

    // transactions
    let txn = await account.signTransaction({
        from: account.address,
        to: config.toAddr,
        value: web3.utils.toHex(web3.utils.toWei("0.0001", "ether")),
        data: web3.utils.toHex('Hello!'),
        gas: 200000  // gasLimit
    })
    console.log(txn);

    let eg = await txns.estimateGas(config.toAddr, txn.rawTransaction);
    console.log(`Estimated Gas: ${eg} wei`);

    let rec = await txns.sendSignedTransaction(txn.rawTransaction);
    console.log(rec);

    // contract
    let c = new Erc20(config.erc20ContractAddr);

    let ts = await c.getTotalSupply();
    console.log(`Total Supply: ${ts} wei`);

    let bo = await c.getBalanceOf(config.publicAddr);
    console.log(`Balance: ${bo} wei`);
 
    let al = await c.getAllowance(config.publicAddr, config.toAddr);
    console.log(`Allowance: ${al} wei`);
    
    let tr = await c.transfer(account, config.toAddr, 1000);
    console.log(tr);
    
    let ap = await c.approve(account, config.toAddr, 1000);
    console.log(ap);
   
    let tf = await c.transferFrom(account, account.address, config.toAddr, 1000);
    console.log(tf);

    let logs = await c.getLogs('0x0');
    console.log(logs);

}

main();