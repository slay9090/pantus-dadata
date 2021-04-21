const {MongoClient} = require('mongodb');



const fs = require('fs')

fs.readFile('./categories.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err)
    return
  }
  try {
    const customer = JSON.parse(jsonString)

    run(nest(customer)).catch(console.dir);

  } catch(err) {
    console.log('Error parsing JSON string:', err)
  }
})



const nest = (items, id = null, link = 'PARENT_ID') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.AC_TREE_ID) }));


const uri = 'mongodb://root:dagdycUCFYbV9kAu@adm-dev.pantus.ru:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';

  const client = new MongoClient(uri);
  async function run(data) {
    try {
      await client.connect();

      const database = client.db("original-nomenclature");
      const categories = database.collection("categories");
      categories.insert(data)

    } finally {
      await client.close();
    }
  }




