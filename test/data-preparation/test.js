
const query = {
  sku: 'xxx',
  brand: 'yyy'

}

const filters = {
  SKU: query.sku,
  BRAND: query.brand ? query.brand : null
}


// for (const prop in filters) {
//   console.log(prop);
// }

// console.log(filters.map(key => key.brand !== null));

let xxx = (obj) => Object.assign(...Object.keys(obj).filter(key => obj[key] !== null).map(key => ({[key]: obj[key]})) )
console.log(xxx(filters));


Object.filter = (obj, predicate) =>
  Object.assign(...Object.keys(obj)
    .filter( key => predicate(obj[key]) )
    .map( key => ({ [key]: obj[key] }) ) );

// Example use:
var scores = {
  John: 2, Sarah: 3, Janet: 1
};
var filtered = Object.filter(scores, score => score > 1);
// console.log(filtered);