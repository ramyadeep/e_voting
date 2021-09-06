const { mySqlConn } = require('../utils/db');
const { BlockChain, Block } = require('../utils/BlockChain');
const lodash = require('lodash');

module.exports.casteVote = async (req,res)=>{
    const chain = new BlockChain();
    const {candidateId,voterId} = req.query;
    if(lodash.isEmpty(candidateId) || lodash.isEmpty(voterId)){
        res.sendStatus(400).send({ message: "Please Provide all the fields"});
    }
    else{
        chain.addBlock(new Block(Date(), { voterId, candidateId, timestamp: Date() }));
        res.send({voterId,candidateId,timestamp:Date()});
    }
}