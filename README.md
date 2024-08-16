# isin-api

Source code for ISIN API hosted on cloudflare. Check wiki section for more details.

## Execution 

Follow the given steps below to setup a new release for database.

1. Execute the `setup.js` under `src/scripts` folder

``` Node.js

node src/scripts/setup.js

```
2. After completion of the previous step, `.db` file (sqlite database file) should be generated in `src/scripts/db` folder. Convert to sqlite `.sql` file using below command

```

sqlite3 <path to db folder>/isin.db .dump > ../sql/isin.sql

```

Check Db gerneration page under wiki for references.

3. Export the db to remote D1 server using below command. Ensure that wrangler login has been done prior to execution of below command.

```
$ npx wrangler d1 export <database_name> --remote --output=isin.sql

```

The database name is mentioned in the `wrangler.toml` file.

Steps to update worker 

1. In case the worker related changes are performed such as updating the wrangler.toml or rest endpoints modification then this must be pushed to remote worker server using the below command

```

npx wrangler deploy

```