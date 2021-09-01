const mysql = require('mysql2/promise');
const server = require('./lib/server');


const app = {}


app.init = async () => {
    //paruosti reikiamus direktorijas
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'barsukas'
    });

    //paruosti reikiamus failus

    //inicijuojame serveri
    server.init(connection);
}

app.init();

module.exports = app;