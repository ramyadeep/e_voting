const {mySqlConn} = require('../utils/db');
module.exports.candidateList = async(req,res)=>{
    const db = await mySqlConn();
    const qry = "SELECT * FROM candidates";
    db.query(qry,(err,result)=>{
        if (err){
            res.sendStatus(400).send({message:"Some Error has occured"});
        }else{
            res.send(result);
        }
    });
}