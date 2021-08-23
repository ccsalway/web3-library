exports.getBalance = async (address) => {
    return await web3.eth.getBalance(address);
}

exports.getTransactionCount = async (address) => {
    return await web3.eth.getTransactionCount(address);
}

exports.signTransaction = async (privateKey, transaction) => {
    // infura does not support unlocking accounts and 
    // therefore does not support eth_signTransaction
    return await web3.eth.accounts.signTransaction(transaction, privateKey);
}
