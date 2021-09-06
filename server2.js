const express = require('express');
const {candidateList} = require('./routehandlers/candidates');
const {login} =  require('./routehandlers/authentication');
const {casteVote} = require('./routehandlers/cast_vote');
const {chainStatus} = require('./routehandlers/blockchain_status')
const {BlockChain} = require('./utils/BlockChain');

const app = express();
const chain = new BlockChain();

app.use(express.urlencoded({ extended: true }));


app.post('/login',login);



app.get('/chainStatus',chainStatus);

app.get('/candidates', candidateList);

app.post('/vote',casteVote);

app.listen(3000,'192.168.42.4', () => console.log("Server Started"));
