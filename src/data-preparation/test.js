const arr = [
  {
    "_id": "6073f378599dbb1d3474e666",
    "AC_TREE_ID": 12323,
    "PARENT_ID": null,
    "NAME": "Двигатель"
  },
  {
    "_id": "6073f378599dbb1d3474e667",
    "AC_TREE_ID": 12324,
    "PARENT_ID": 12323,
    "NAME": "Крепление двигателя"
  },
  {
    "_id": "6073f378599dbb1d3474e668",
    "AC_TREE_ID": 12325,
    "PARENT_ID": 12324,
    "NAME": "Опоры"
  },

  {
    "_id": "6073f378599dbb1d3474e67c",
    "AC_TREE_ID": 12345,
    "PARENT_ID": null,
    "NAME": "Трансмиссия"
  },
  {
    "_id": "6073f378599dbb1d3474e67d",
    "AC_TREE_ID": 12346,
    "PARENT_ID": 12345,
    "NAME": "Сцепление"
  },
  {
    "_id": "6073f378599dbb1d3474e67e",
    "AC_TREE_ID": 12347,
    "PARENT_ID": 12346,
    "NAME": "Механизм управления сцеплением"
  },
]

const ids = [12347, 12324]
let result = []

function getPatch (ids){

  arr.forEach(elem => {
    ids.forEach((id, index) => {
      if (elem.AC_TREE_ID === id) {
        result[index] = elem

        if(elem.PARENT_ID !== null){
          recursive(elem.PARENT_ID, index)
        }

      }
    })

  })

}

function recursive(parrentId, index){

    arr.forEach( elem => {
      if (elem.AC_TREE_ID === parrentId) {
        result[index] = { ...elem ,child: result[index]}

        if(elem.PARENT_ID !== null){
          recursive(elem.PARENT_ID, index)
        }

      }
    })

}

getPatch(ids)
console.log(...result);