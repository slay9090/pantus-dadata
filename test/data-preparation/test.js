const arr = [
  {
    CATEGORY_ID: 136,
    CATEGORY_PARENT_ID: null,
    CATEGORY_NAME: 'Двигатель'
  },
  {
    CATEGORY_ID: 137,
    CATEGORY_PARENT_ID: 136,
    CATEGORY_NAME: 'Двигатель в сборе'
  },
  {
    CATEGORY_ID: 138,
    CATEGORY_PARENT_ID: 137,
    CATEGORY_NAME: 'Прокладка двигателя'
  },
  {
    CATEGORY_ID: 139,
    CATEGORY_PARENT_ID: 137,
    CATEGORY_NAME: 'Подвеска двигателя'
  },
  {
    CATEGORY_ID: 140,
    CATEGORY_PARENT_ID: 136,
    CATEGORY_NAME: 'Основные элементы двигателя'
  },
  {
    CATEGORY_ID: 141,
    CATEGORY_PARENT_ID: 140,
    CATEGORY_NAME: 'Блок цилиндров и головка блока'
  },
  {
    CATEGORY_ID: 142,
    CATEGORY_PARENT_ID: 140,
    CATEGORY_NAME: 'Картер масляный и крышки блока'
  },
  {
    CATEGORY_ID: 143,
    CATEGORY_PARENT_ID: 140,
    CATEGORY_NAME: 'Вал коленчатый и маховик'
  },

  {
    CATEGORY_ID: 1136,
    CATEGORY_PARENT_ID: null,
    CATEGORY_NAME: 'Трансмиссия'
  },
  {
    CATEGORY_ID: 1137,
    CATEGORY_PARENT_ID: 1136,
    CATEGORY_NAME: 'Трансмиссионый блок'
  },
  {
    CATEGORY_ID: 1138,
    CATEGORY_PARENT_ID: 1137,
    CATEGORY_NAME: 'Шайба м8'
  },
]

/***/
let elements = {};

arr.forEach(obj => {
  elements[obj.CATEGORY_ID] = obj;
});

function getTreeCategoriesByIds(ids) {
  return ids.map(id => {
    let obj = { ...elements[id] };

    while (obj.CATEGORY_PARENT_ID) {
      let parent = { ...elements[obj.CATEGORY_PARENT_ID] };
      parent.child = obj;

      obj = parent;
    }

    return obj;
  });
}

/***/
const ids = [138, 140, 1138];
let result = getTreeCategoriesByIds(ids);

console.log(...result);