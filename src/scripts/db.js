const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = __dirname + "db/isin.db";

function createTable(db) {

    db.exec(`
        CREATE TABLE ISIN(
            isin VARCHAR(14) PRIMARY KEY,
            description VARCHAR(129),
            issuer VARCHAR(92),
            type VARCHAR(33),
            status VARCHAR(20)
        );
    `);
    console.log("Table created");
}

function deleteTable(db) {

    db.exec(`
        DROP TABLE IF EXISTS ISIN;
    `);
    console.log("Table deleted");
}

function createDBConnection() {

    if(fs.existsSync(filepath)) {
        console.log("Connection with existing SQLite has been established");
        const db = new sqlite3.Database(filepath);
        deleteTable(db);
        createTable(db);
        return db;
    } else {
        const db new sqlite3.Database(filepath, (error) => {
            if(error) {
                return console.error(error.message);
            }
            createTable(db);
        });
        console.log("Connection with new SQLite has been established");
        return db;
    }
}

module.exports = createDBConnection();