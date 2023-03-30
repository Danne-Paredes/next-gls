
const { BigQuery } = require("@google-cloud/bigquery");

const bigquery = new BigQuery({
projectId: 'gls-prod',
keyFilename: 'credentials/gls-prod-3c982c4028df.json',
});

export default async (req, res) => {
    if (req.method === 'POST') {
        const { uuid,timestamp,ein,associate,casino,event,game,date,trainer,time,mistakes,version,notes,next_step } = req.body;
        
    
        // Insert the new row into the BigQuery table
        const dataset = bigquery.dataset('gls_ein');
        const table = dataset.table('cloud_gls');
        const rows = [{ uuid,timestamp,ein,associate,casino,event,game,date,trainer,time,mistakes,version,notes,next_step }];
        await table.insert(rows);
        res.status(200).json({ message: 'Row inserted successfully.' });
    } else {
        res.status(400).json({ message: 'Invalid request method.' });
    }
}
