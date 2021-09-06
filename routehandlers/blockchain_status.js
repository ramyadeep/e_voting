const { BlockChain, Block } = require('../utils/BlockChain');
module.exports.chainStatus = async (req,res)=>{
    const chain = new BlockChain();
    setTimeout(() => {
        res.send({
            chain: chain.chain,
            secured: chain.isBlockChainValid()
        });
    }, 1000);
}