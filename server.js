const express = require('express');
// const { Block, BlockChain, dbInterface } = require('./utils/BlockChain');

const app = express();
const { login } = require('./routehandlers/authentication');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
});

app.post('/',login);

// app.get('/latest',async (req,res)=>{
//     let latestBlock = await b.getLatestBlock().hash;
//     res.send(latestBlock);
// })
app.listen(3000, () => console.log("Server Started"));
