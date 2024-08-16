const db = require("./db");

function insertRow(data) {
    
    const [isin, description, issuer, type, status] = data;
    db.run(`INSERT into ISIN (isin, description, issuer, type, status) VALUES (?, ?, ?, ?, ?)`, [isin, description, issuer, type, status], (error) => {
        if(error)
            console.log(error.message);
    });
}

module.exports = insertRow;