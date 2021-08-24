exports.estimateGas = async (toAddr, data) => {
    return await web3.eth.estimateGas({
        to: toAddr,
        data: data
    });
}

exports.sendSignedTransaction = async (transaction) => {
    return await web3.eth.sendSignedTransaction(transaction)
}
