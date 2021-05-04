
## Описание

Pantus DADATA API

## Документация

https://aoc.pantus.ru/doc


### Запросы mongoDB

```
// Чекнуть на дубли

db.originals_parts.aggregate(
[ 
{ $limit: 1000000}, 
{ $group: { _id: { SKU: "$SKU", CATEGORY_ID: "$CATEGORY_ID", BRAND: "$BRAND" }, count: { $sum: 1 } } },
{ $match: { count: { $gte: 2 } } },
],
{ allowDiskUse: true }
);


/// Удалить дубликаты из базы лимит lenght
var duplicates = [];
db.originals_parts.aggregate([
  { $limit: 1000000}, 
  { $match: { 
    name: { "$ne": '' }  // discard selection criteria

  }},
  { $group: { 
    _id: { SKU: "$SKU", CATEGORY_ID: "$CATEGORY_ID", BRAND: "$BRAND"}, // can be grouped on multiple properties 
    dups: { "$addToSet": "$_id" }, 
    count: { "$sum": 1 }
  }}, 
  { $match: { 
    count: { "$gt": 1 }    // Duplicates considered as count greater than one
  }}
],
{allowDiskUse: true}
      // For faster processing if set is larger
)               // You can display result until this and check duplicates 
.forEach(function(doc) {
    doc.dups.shift();      // First element skipped for deleting
    doc.dups.forEach( function(dupId){ 
        duplicates.push(dupId);   // Getting all duplicate ids
        }
    )    
})
// If you want to Check all "_id" which you are deleting else print statement not needed
//printjson(duplicates);     
// Remove all duplicates in one go    
db.originals_parts.deleteMany({_id:{$in:duplicates}})  

```


