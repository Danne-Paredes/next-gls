
const { BigQuery } = require("@google-cloud/bigquery");

const bigquery = new BigQuery({
projectId: 'gls-prod',
keyFilename: 'credentials/gls-prod-3c982c4028df.json',
});

export default async function handler(req, res) {
    const query = `
        SELECT *
        FROM \`gls-prod.gls_ein.emp_roster_as_view\`
        order by name
    `;

    const options = {
        query: query,
    };

    // Run your query/logic here
    const [rows] = await bigquery.query(options);

    res.json(rows); // Return your JSON data after logic has been applied
}
