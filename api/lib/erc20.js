module.exports = class Erc20 {

    constructor(address) {
        this.address = address;
    }

    async getTotalSupply() {
        let method = web3.utils.sha3('totalSupply()').slice(0, 10);
        let param1 = ''.padStart(64, '0');
        let resp = await web3.eth.call({
            to: this.address,
            data: `${method}${param1}`
        })
        return web3.utils.hexToNumber(resp);
    }

    async getBalanceOf(address) {
        if (address.startsWith('0x')) address = address.slice(2)
        let method = web3.utils.sha3('balanceOf(address)').slice(0, 10);
        let param1 = address.padStart(64, '0');
        let resp = await web3.eth.call({
            to: this.address,
            data: `${method}${param1}`
        })
        return web3.utils.hexToNumber(resp);
    }

    async getAllowance(owner, delegate) {
        if (owner.startsWith('0x')) owner = owner.slice(2)
        if (delegate.startsWith('0x')) delegate = delegate.slice(2)
        let method = web3.utils.sha3('allowance(address,address)').slice(0, 10);  // owner, recipient
        let param1 = owner.padStart(64, '0');
        let param2 = delegate.padStart(64, '0');
        let resp = await web3.eth.call({
            to: this.address,
            data: `${method}${param1}${param2}`
        })
        return web3.utils.hexToNumber(resp);
    }

    async approve(account, recipient, value, gasLimit = 200000) {
        if (recipient.startsWith('0x')) recipient = recipient.slice(2)
        let method = web3.utils.sha3('approve(address,uint256)').slice(0, 10);  // recipient, value
        let param1 = recipient.padStart(64, '0');
        let param2 = web3.utils.toHex(value).slice(2).padStart(64, '0');
        let txn = await account.signTransaction({
            from: account.address,
            to: this.address,
            value: 0,
            data: `${method}${param1}${param2}`,
            gas: gasLimit
        })
        return await web3.eth.sendSignedTransaction(txn.rawTransaction);
    }

    async transfer(account, receiver, value, gasLimit = 200000) {
        if (receiver.startsWith('0x')) receiver = receiver.slice(2)
        let method = web3.utils.sha3('transfer(address,uint256)').slice(0, 10);  // recipient, value
        let param1 = receiver.padStart(64, '0');
        let param2 = web3.utils.toHex(value).slice(2).padStart(64, '0');
        let txn = await account.signTransaction({
            from: account.address,
            to: this.address,
            value: 0,
            data: `${method}${param1}${param2}`,
            gas: gasLimit
        })
        return await web3.eth.sendSignedTransaction(txn.rawTransaction);
    }

    async transferFrom(account, owner, recipient, value, gasLimit = 200000) {
        if (owner.startsWith('0x')) owner = owner.slice(2)
        if (recipient.startsWith('0x')) recipient = recipient.slice(2)
        let method = web3.utils.sha3('transferFrom(address,address,uint256)').slice(0, 10); // owner, recipient, value
        let param1 = owner.padStart(64, '0');
        let param2 = recipient.padStart(64, '0');
        let param3 = web3.utils.toHex(value).slice(2).padStart(64, '0');
        let txn = await account.signTransaction({
            from: account.address,
            to: this.address,
            value: 0,
            data: `${method}${param1}${param2}${param3}`,
            gas: gasLimit
        })
        return await web3.eth.sendSignedTransaction(txn.rawTransaction);
    }

    async getLogs(fromBlock = 'latest', toBlock = 'latest', topics = null) {
        return await web3.eth.getPastLogs({
            fromBlock: fromBlock,
            toBlock: toBlock,
            address: this.address,
            topics: topics
        })
    }
    
}
