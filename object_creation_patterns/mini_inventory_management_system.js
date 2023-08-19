/*
ItemManager:
has an ItemCreater (factory function)
  makes instances which
  have:
    SKU - first three letters which occur in Name + first 2 of Category
    Name - minimum of 5 non-whitespace chars
    Category - min 5 chars, (no spaces allowed)
    Quanitity - must exists, but if it does, it will be a valid number
    if invalid object
      notValid: true

has a list of items `items`
can:
  create - creates a new item, returns item or false if item cannot be created
  update - takes SKU and object, updates any properties provided by the object for the item with that SKU
  delete - takes SKU and deletes item
  inStock - returns array of items w/ non-zero quantity
  itemsInCategory - returns array of items with argument category


ReportManager:
has an ItemManager as `items` - initialized from `init` invocation
can 
  createReporter (factory function) - takes SKU, returns object
    report objects:
      can:
        itemInfo - logs properties of item for that SKU as key: value pairs, properties are private to the method...
  reportInStock
    logs all non-zero quantity items as CSV

Other notes:
- OLOO, based on test cases
*/

function ItemCreator(name, category, quantity) {
  if (quantity === undefined ||
      / /.test(category) ||
      category.length < 5 ||
      name.replace(/\s/g, '').length < 5) return { notValid: true };
  
  let SKU = name.replace(/\s/g, '').slice(0, 3) + category.slice(0, 2);
  SKU = SKU.toUpperCase();

  return { SKU, name, category, quantity };
}

const ItemManager = {
  items: [],

  create(...args) {
    let item = ItemCreator(...args);
    if (item.notValid) return false;
    this.items.push(item);
    return item;
  },

  update(SKU, fields) {
    let item = this.items.find(item => item.SKU === SKU);
    return Object.assign(item, fields);
  },

  delete(SKU) {
    this.items = this.items.filter(item => item.SKU !== SKU);
  },

  inStock() {
    return this.items.filter(item => item.quantity !== 0);
  },

  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  }
};

const ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },

  reportInStock() {
    this.items.inStock().forEach(item => {
      Object.keys(item).forEach(property => {
        console.log(`${property}, ${item[property]}`);
      });
      console.log("");
    });
  },

  createReporter(SKU) {
    let item = this.items.items.find(item => item.SKU === SKU);
    return {
      itemInfo() {
        Object.keys(item).forEach(property => {
          console.log(`${property}: ${item[property]}`);
        });
      },
    };
  },
};

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

// console.log(ItemManager.items);
// // returns list with the 4 valid items

ReportManager.init(ItemManager);
// ReportManager.reportInStock();
// // logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
// console.log(ItemManager.inStock());
// // returns list with the item objects for football and kitchen pot
// ReportManager.reportInStock();
// // logs football,kitchen pot
// console.log(ItemManager.itemsInCategory('sports'));
// // returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
// console.log(ItemManager.items);
// // returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10