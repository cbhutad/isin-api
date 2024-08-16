import {Hono} from 'hono'

const app = new Hono();

const apiDoc = `
    <html>
        <head>
            <title>ISIN API docs</title>
        </head>
        <body>
            <h1> ISIN API </h1>
            <div>
                <h3> Introduction </h3>
                <p> An International Securities Identification Number (ISIN) is a 12-digit alphanumeric code that uniquely identifies a specific security. The organization that allocates ISINs in any particular country is the country's respective National Numbering Agency (NNA).</p>
                <p>
                    References: <br/>
                    <ul>
                        <li> <a href="https://en.wikipedia.org/wiki/International_Securities_Identification_Number">Wikipedia</a></li>
                    </ul>
                </p>
            </div>
            <div>
                <h3> API endpoints </h3>
                <h4><i><strong>/api/isin/{ISIN number}</strong></i></h4>
                <p> Provides details for the given ISIN. The ISIN can be provided in lowercase or uppercase format. <a href="https://db-exampe.testmailcbhutad.workers.dev/api/isin/IN000126C010">Sample Example.</a></p>
                <h4><i><strong>/api/isin_status/{STATUS}</strong></i></h4>
                <p> Provides list of ISIN of given status. The status can be provided in lowercase or uppercase format. <a href="https://db-exampe.testmailcbhutad.workers.dev/api/isin_status/blocked due to aca">Sample Example.</a></p>
                <h4><i><strong>/api/isin_status_type/{STATUS}/{TYPE}</strong></i></h4>
                <p> Provides list of ISIN of given status and type. The status, type can be provided in lowercase or uppercase format. <a href="https://db-exampe.testmailcbhutad.workers.dev/api/isin_status_type/blocked due to aca/equity shares">Sample Example.</a></p>
                <h4><i><strong>/api/isin_status_type_issuer/{STATUS}/{TYPE}/{ISSUER}</strong></i></h4>
                <p> Provides list of ISIN of given status, type and issuer. The status, type and issuer can be provided in lowercase or uppercase format. <a href="https://db-exampe.testmailcbhutad.workers.dev/api/isin_status_type_issuer/blocked due to aca/equity shares/tata steel bsl limited">Sample Example.</a></p>
                <h4><i><strong>/api/isin_description/{DESCRIPTION}</strong></i></h4>
                <p> Provides list of ISIN of given description which may be even partially matching. The description can be provided in lowercase or uppercase format. <a href="https://db-exampe.testmailcbhutad.workers.dev/api/isin_description/quant mutual fund">Sample Example.</a></p>
            </div>
            <div>
                <h3>Source</h3>
                <p> The source file for all this records are taken from the csv file generated in the Captain nemo <a href="https://github.com/captn3m0/india-isin-data">github repo</a>, daily at midnight.
            </div>
        </body>
    </html>
`;

app.get('/', async c => {
    const docUrl = "https://db-exampe.testmailcbhutad.workers.dev/docs"
    return c.redirect(docUrl);
});

app.get('/docs', async c => {
    return c.html(apiDoc);
});

app.get('/api/isin/:isin', async c => {
    const {isin} = c.req.param()
    const {results} = await c.env.DB.prepare(`select * from ISIN where isin = ?`).bind(isin).all();
    return c.json(results);
});

app.get('/api/isin_status/:stat', async c => {
    const {stat} = c.req.param();
    //console.log(stat);
    const {results} = await c.env.DB.prepare(`select * from ISIN where status = ?`).bind(stat.toUpperCase()).all();
    return c.json(results);
});

app.get('/api/isin_status_type/:stat/:type', async c => {
    const {stat, type} = c.req.param();
    //const {type} = c.req.param();
    const {results} = await c.env.DB.prepare(`select * from ISIN where status = ? and type = ?`).bind(stat.toUpperCase(), type.toUpperCase()).all();
    return c.json(results);
});

app.get('/api/isin_status_type_issuer/:stat/:type/:issuer', async c => {
    const {stat, type, issuer} = c.req.param();
    const {results} = await c.env.DB.prepare(`select * from ISIN where status = ? and type = ? and issuer = ?`).bind(stat.toUpperCase(), type.toUpperCase(), issuer.toUpperCase()).all();
    return c.json(results);
});

app.get('/api/isin_description/:description', async c => {
    const {description} = c.req.param();
    const {results} = await c.env.DB.prepare(`select * from ISIN where description like ?`).bind("%" + description.toUpperCase() + "%").all();
    return c.json(results);
});

export default app;