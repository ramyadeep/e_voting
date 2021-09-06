const SHA256 = require("crypto-js/sha256");
const { mySqlConn } = require('./db');

class Block {
    constructor(castingTime, record, previousHash = '') {
        this.index = 0;
        this.castingTime = castingTime;
        this.record = record;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }

    calculateHash() {
        return SHA256(
            this.calculateHash + this.perviousHash + JSON.stringify(this.record) + this.nonce + this.castingTime
        ).toString();
    }
}

class BlockChain {
    constructor() {
        this.db = new dbInterface();
        this.chain = [];
        this.difficulty = 2;
        this.syncDatabase();
    }

    async syncDatabase() {
        const t = new dbInterface();

        if (! await t.isGenesis()) {
            this.addGenesisBlock(new Block(Date(), "GENESIS", "0000"));
        }
        this.chain = await t.loadBlocks();
    }


    async addGenesisBlock(newBlock) {
        this.chain.push(newBlock);
        var t = new dbInterface();
        t.pushNew(newBlock);
        // this.syncDatabase();
    }

    async addBlock(newBlock) {
        newBlock.index = this.chain.length;
        let latestBlock = await this.db.getLatestBlock();
        newBlock.record = JSON.stringify(newBlock.record);
        newBlock.previousHash = latestBlock.hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        var t = new dbInterface();
        t.pushNew(newBlock);
    }
    isBlockChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }
        return true;
    }
}




class dbInterface {

    async getLatestBlock() {
        const db = await mySqlConn();
        const query = `SELECT * FROM casting_chain ORDER BY castingTime DESC LIMIT 1`;
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let block = new Block();
                    block.index = result[0].id - 1;
                    block.record = result[0].record;
                    block.castingTime = result[0].castingTime;
                    block.hash = result[0].hash;
                    block.previousHash = result[0].previousHash;
                    block.nonce = result[0].nonce;
                    resolve(block);
                }
            });
        })
    }

    async loadBlocks() {
        const db = await mySqlConn();
        const query = `SELECT * FROM casting_chain ORDER BY castingTime`;
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    let listOfBlocks = [];
                    result.forEach(element => {
                        let block = new Block();
                        block.index = element.id - 1;
                        block.record = element.record;
                        block.castingTime = element.castingTime;
                        block.hash = element.hash;
                        block.previousHash = element.previousHash;
                        block.nonce = element.nonce;
                        listOfBlocks.push(block);
                    });
                    resolve(listOfBlocks);
                }
            });
        })
    }

    async isGenesis() {
        const db = await mySqlConn();
        const query = `SELECT * FROM casting_chain WHERE record = 'GENESIS'`;
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (result.length !== 0) resolve(true);
                    else resolve(false);
                }
            });
        })
    }

    async pushNew(newBlock) {
        const db = await mySqlConn();
        const query = `INSERT INTO casting_chain (record,hash,previousHash,nonce) VALUES (?,?,?,?)`;
        db.query(query, [newBlock.record, newBlock.hash, newBlock.previousHash, newBlock.nonce], (err, result) => {
            if (err) throw err;
            else {
                console.log('record pushed');
            }
        });
    }
}



module.exports = { Block, BlockChain, dbInterface };

