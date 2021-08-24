module.exports = class Account {

    constructor(privateKey) {
        this.switchAccount(privateKey);
    }

    async switchAccount(privateKey) {
        this.account = web3.eth.accounts.privateKeyToAccount(privateKey);
        this.address = this.account.address;
    }

    async getBalance() {
        return await web3.eth.getBalance(this.account.address);
    }
    
    async getTransactionCount() {
        return await web3.eth.getTransactionCount(this.account.address);
    }
    
    async signTransaction(transaction) {
        return await this.account.signTransaction(transaction);
    }
    
}