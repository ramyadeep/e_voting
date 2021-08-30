const { mySqlConn } = require('../utils/db');
module.exports.login = async (req, res) => {
    const reqPath = __dirname.substring(0, __dirname.length - 13);
    const db = await mySqlConn();
    const query = `SELECT * FROM voters WHERE email = '${req.body.email}' AND password= '${req.body.password}'`;
    db.query(query, (err, result) => {
        if (err) throw err;
        else {
            if (result.length == 0) {
                res.statusCode = 401;
                res.render('error');
            }
            else {
                res.render('home',{user:result[0]});
            }
        }
    });

}





