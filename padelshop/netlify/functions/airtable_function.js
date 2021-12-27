const Airtable = require('airtable');

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appN7I9DtKRH4S7er');

exports.handler = function(event, context, callback) {
    const allRecords = []
    base('Table 1')
      .select({
        maxRecords: 100,
        view: "Grid view"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            allRecords.push(record)
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            callback(err)
          } else {
            const body = JSON.stringify({ records: allRecords })
            const response = {
              statusCode: 200,
              body: body,
              headers: {
                'content-type': 'application/json',
                'cache-control': 'Cache-Control: max-age=300, public'
              }
            }
            callback(null, response)
          }
        }
      )
  }

// exports.handler = function(event, context, callback) {
//     base('Table 1').select({
//         // Selecting the first 3 records in Grid view:
//         maxRecords: 3,
//         view: "Grid view"
//     }).eachPage(function page(records, fetchNextPage) {
//         // This function (`page`) will get called for each page of records.
    
//         records.forEach(function(record) {
//             console.log('Retrieved', record.get('RacketId'));
//             console.log("Retrieved", record.get("RacketName"))
//         });
    
//         // To fetch the next page of records, call `fetchNextPage`.
//         // If there are more records, `page` will get called again.
//         // If there are no more records, `done` will get called.
//         fetchNextPage();
    
//     }, function done(err) {
//         if (err) { console.error(err); return; }
//     });
// }