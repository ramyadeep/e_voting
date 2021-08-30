const express = require('express');
const { login } = require('./routehandlers/authentication');
const { voteWindow } = require('./routehandlers/voting');
// const { Block, BlockChain, dbInterface } = require('./utils/BlockChain');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/',login);


app.get('/vote/:voterID',voteWindow);
app.listen(3000,'192.168.42.4', () => console.log("Server Started"));
