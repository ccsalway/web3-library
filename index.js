global.Web3 = require('web3');
const Erc20 = require('./lib/erc20.js');
const config = require('./config.js');
const chain = require('./lib/blockchain.js');
const wallet = require('./lib/wallet.js');
const txns = require('./lib/transactions.js');


// global.web3 = new Web3(window.ethereum);
// await window.ethereum.enable();

async function main() {
    // chain
    chain.connect(`https://${config.network}.infura.io/v3/${config.project_id}`);

    let bn = await chain.blockNumber();
    console.log(bn);

    let b1 = await chain.getBlockByNumber(bn);
    console.log(b1);

    let b2 = await chain.getBlockByHash(b1.hash);
    console.log(b2);

    let gp = await chain.getGasPrice();
    console.log(Web3.utils.fromWei(gp, 'ether') + ' ETH');

    // wallet
    let bal = await wallet.getBalance(config.public_addr);
    console.log(Web3.utils.fromWei(bal, 'ether') + ' ETH');

    let tc = await wallet.getTransactionCount(config.public_addr);
    console.log(tc);

    // contract
    let c = new Erc20(config.erc20_contract_addr);

    let ts = await c.getTotalSupply();
    console.log(ts + ' wei');

    let logs = await c.getLogs('0x0');
    console.log(logs);

    let bo = await c.getBalanceOf(config.public_addr);
    console.log(bo + ' wei');

    let al = await c.getAllowance(config.public_addr, config.to_addr);
    console.log(al + ' wei');

    // transactions
    let txn = await wallet.signTransaction(config.private_key, {
        from: config.public_addr,
        to: config.to_addr,
        value: web3.utils.toHex(web3.utils.toWei("0.0001", "ether")),
        data: web3.utils.toHex('Hello!'),
        gas: 200000  // gasLimit
    })
    console.log(txn);

    let eg = await txns.estimateGas(config.to_addr, txn.rawTransaction);
    console.log(eg);

    let rec = await txns.sendSignedTransaction(txn.rawTransaction);
    console.log(rec);
}

main();