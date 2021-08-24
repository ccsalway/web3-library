exports.connect = async (provider_url) => {
    global.web3 = new Web3(new Web3.providers.HttpProvider(provider_url));
}

exports.blockNumber = async () => {
    return await web3.eth.getBlockNumber();
}

exports.getBlockByHash = async (hash, returnTxns = false) => {
    return await web3.eth.getBlock(hash, returnTxns);
}

exports.getBlockByNumber = async (number, returnTxns = false) => {
    return await web3.eth.getBlock(number, returnTxns);
}

exports.getGasPrice = async () => {
    return await web3.eth.getGasPrice();
}
