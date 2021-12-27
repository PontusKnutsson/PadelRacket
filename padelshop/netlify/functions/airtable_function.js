const Airtable = require('airtable/build/airtable.browser');

// Airtable.configure({
//     endpointUrl: 'https://api.airtable.com',
//     apiKey: process.env.AIRTABLE_API_KEY
// });

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appN7I9DtKRH4S7er');

// const base = Airtable.Base("appN7I9DtKRH4S7er");

exports.handler = function(event, context, callback) {
    base('Table 1').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 3,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            console.log('Retrieved', record.get('RacketId'));
            console.log("Retrieved", record.get("RacketName"))
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}