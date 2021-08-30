var faker = require('faker');
const { mySqlConn } = require('../utils/db');

var voterList = [];

for (let i = 0 ; i < 10 ; i++){
    test();
}

async function test() {
    const db =  await mySqlConn();
    const voter = { voterName: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password() };
    db.query("INSERT INTO voters SET ?",voter,(error,results)=>{
        if(error)
         throw error;
    });
    console.log('Dataset created');
}
test();