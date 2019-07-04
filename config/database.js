const mysql = require('mysql');
const databaseName = 'website-gallery';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: databaseName
});

con.connect((err) => {
    if (!err) {
        console.log(`+ Connected to {${databaseName}} database`)
    } else {
        console.log(`Database error: ${err}`)
    }
})

module.exports = {
    con: con,
}