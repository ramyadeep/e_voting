const { BlockChain, Block } = require('.//BlockChain');
const SHA256 = require("crypto-js/sha256");

const a = new Block(Date(), { voterSignature: SHA256("someSignature").toString(), casting: "some id 2" });
const b = new Block(Date(), { voterSignature: "someSignature2", casting: "some id 2" });
const SecuredChain = new BlockChain();

SecuredChain.addBlock(a);
SecuredChain.addBlock(b);


console.log(SecuredChain.chain);
console.log(SecuredChain.isBlockChainValid());