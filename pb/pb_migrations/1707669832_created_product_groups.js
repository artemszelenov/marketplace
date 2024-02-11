/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1bbf8wbkacn5czw",
    "created": "2024-02-11 16:43:52.062Z",
    "updated": "2024-02-11 16:43:52.062Z",
    "name": "product_groups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ybbcpcdh",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1bbf8wbkacn5czw");

  return dao.deleteCollection(collection);
})
