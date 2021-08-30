const {mySqlConn} = require('../utils/db');
module.exports.voteWindow = async (req, res) => {
    // console.log(req.params);
    const db = await mySqlConn();
    const query = 'SELECT * FROM candidates;';
    db.query(query,(err,result)=>{
        if(err) res.render('error');
        else{
            res.render('vote',{data: result});
        }
    });
};