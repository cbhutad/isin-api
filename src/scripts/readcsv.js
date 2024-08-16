const axios = require("axios");
const fs = require("fs");
const readline = require("readline");
const insertRow = require("./insertdata");

//generated csv file path
const filePath = __dirname + "csv/isin.csv";

//Get today's date to create URL format
const currentDate = new Date();
//Get previous Date as this script will be executed after midnight
const prevDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
const day = prevDate.getDate();
const month = prevDate.getMonth() + 1;
const year = prevDate.getFullYear();

//get request response data as string
let csvString = "";
let recordCount = 0;

async function fetchCSV() {

    const githubURL = `https://github.com/captn3m0/india-isin-data/releases/download/v${year}.${month}.${day}/ISIN.csv`;
    console.log(url);
    const response = await axios.get(url);
    csvString = response.data;
    fs.writeFileSync(filePath, csvString);
    consolg.log("CSV File created successfully");

}

async function readCSV() {
    
    await fetchCSV();
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: false,
        console: false
    });

    console.log("DB write started at : ", new Date());

    rl.on("line", function(line) {
        const columns = line.trim().split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
        //Skipping the header for csv.
        if(columns.length == 5 && columns[0] === "ISIN" && columns[1] === "Description" && columns[2] === "Issuer" && columns[3] === "Type" &    & columns[4] === "Status") {
            console.log("Header removed");
            return;
        }

        for(let i = 0;i < columns.length;i++) {
            columns[i] = columns[i].replaceAll('"', '');
        }

        insertRow(columns);
        recordCount++;

        if(recordCount % 10000 === 0) {
            console.log(`${recordCount} records processed`);
        }

    });

    rl.on("close", function() {
        console.log("Total records processed : ", recordCount);
        console.log("DB write ends at : ", new Date());
    });
}

module.exports = readCSV();