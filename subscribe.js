const Web3 = require('web3'); 

const INFURA_KEY = "89d6aea2e53540fc8e8b796055e41795";
const CONTRACT_ADDRESS = "0xec026FaFA3E679A49294EA007bcE46A3Ffb88195";

const web3 = new Web3('wss://ropsten.infura.io/ws/v3/'  +  INFURA_KEY);

var subscription = web3.eth.subscribe('logs', {
    address: CONTRACT_ADDRESS,
    fromBlock: '0x0'
}, function(error, result){
    if (!error)
        console.log(result);
});