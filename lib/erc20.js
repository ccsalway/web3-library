module.exports = class Erc20 {

    constructor(address) {
        this.address = address;
    }

    async getTotalSupply() {
        let method = web3.utils.sha3('totalSupply()').slice(0, 10);
        let param1 = ''.padStart(64, '0')
        let resp = await web3.eth.call({
            to: this.address,
            data: `${method}${param1}`
        })
        return web3.utils.hexToNumber(resp);
    }

    async getBalanceOf(address) {
        if (address.startsWith('0x')) address = address.slice(2)
        let method = web3.utils.sha3('balanceOf(address)').slice(0, 10);
        let param1 = address.padStart(64, '0')
        let resp = await web3.eth.call({
            to: this.address,
            data: `${method}${param1}`
        })
        return web3.utils.hexToNumber(resp);
    }

    async getAllowance(owner, delegate) {
        if (owner.startsWith('0x')) owner = owner.slice(2)
        if (delegate.startsWith('0x')) delegate = delegate.slice(2)
        let method = web3.utils.sha3('allowance(address,address)').slice(0, 10);
        let param1 = owner.padStart(64, '0')
        let param2 = delegate.padStart(64, '0')
        let resp = await web3.eth.call({
            to: this.address,
            data: `${method}${param1}${param2}`
        })
        return web3.utils.hexToNumber(resp);
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
