# isin-api

Source code for ISIN API hosted on cloudflare.

## Code structure

- src
    - scripts
        - setup.js -> Execute .db file generation logic. calls `readCSV` from readcsv.js
        - readcsv.js -> get the previous day release and create .db file logic.
        - insertdata.js -> inserts a single csv entry as row in sqlite3 database.
        - db.js -> return an instance for sqlite3 file.
    - csv
        - contains the release file generated in csv format named as `isin.csv`.
    - db
        - contains the sqlite3 file with extension .db named as `isin.db`.
