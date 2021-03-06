const { MongoClient } = require('mongodb');


async function removeDublicate(client) {


  const db = client.db('dadata');
  const collection = db.collection('cross_parts');

  const maxLenghtValue = await collection.find().count();

  const limitValue = 1000000;
  let offsetValue = 0;

  while (offsetValue <= maxLenghtValue) {

    console.log(offsetValue);


    let duplicates = [];
    await collection.aggregate([
        { $skip: offsetValue },
        { $limit: limitValue },
        {
          $match: {
            name: { '$ne': '' },  // discard selection criteria
          },
        },
        {
          $group: {
            _id: {
              brand_original: '$brand_original',
              sku_original: '$sku_original',
              brand_analog: '$brand_analog',
              sku_analog: '$sku_analog',
            }, // can be grouped on multiple properties
            dups: { '$addToSet': '$_id' },
            count: { '$sum': 1 },
          },
        },
        {
          $match: {
            count: { '$gt': 1 },    // Duplicates considered as count greater than one
          },
        },
      ],
      { allowDiskUse: true },
      // For faster processing if set is larger
    )               // You can display result until this and check duplicates
      .forEach(function(doc) {
        doc.dups.shift();      // First element skipped for deleting
        doc.dups.forEach(function(dupId) {
            duplicates.push(dupId);   // Getting all duplicate ids
          },
        );
      });

    console.log('IDS', duplicates);

    await collection.deleteMany({ _id: { $in: duplicates } });

    offsetValue = offsetValue + limitValue;
  }

  client.close();


}


async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = 'mongodb://root:dagdycUCFYbV9kAu@adm-dev.pantus.ru:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';


  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await removeDublicate(client);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);