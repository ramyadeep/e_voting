const { mySqlConn } = require('../utils/db');
const lodash = require('lodash');
module.exports.login = async (req, res) => {
    const db = await mySqlConn();
    const { email, password } = req.query;
    console.log(email,password);

    if (lodash.isEmpty(email) || lodash.isEmpty(password)) {
        res.sendStatus(400).send({ message: "Please Provide all the fields" });
        return;
    }
    
    const qry = `SELECT * FROM voters WHERE email=${db.escape(email)} AND password= ${db.escape(password)}`;
    db.query(qry, (err, result) => {
        if (err) res.sendStatus(500);
        else {
		if(result.length === 0){
			res.sendStatus(404).send({ message: "User Not Found!" });
			return;
		}else if(result.length > 0){
			res.send(result[0]);
			return;
		}
	}
    });
}