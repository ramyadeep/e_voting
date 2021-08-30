const { mySqlConn } = require('../utils/db');


module.exports.login = async (req,res)=>{
    const db = await mySqlConn();
    let qry = "SELECT * FROM voters WHERE email = ? AND password = ?";
    db.query(qry, [req.body.email, req.body.password],(err,result)=>{
        if(err) throw err;
        else{
            if(result.length == 0){
                res.send('Invalid email or password');
            }else{
                res.send(result[0]);
            }
        }
    });
}