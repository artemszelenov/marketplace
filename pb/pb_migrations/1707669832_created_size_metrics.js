/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hatflxx7dllaea7",
    "created": "2024-02-11 16:43:52.062Z",
    "updated": "2024-02-11 16:43:52.062Z",
    "name": "size_metrics",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2achsxlp",
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
      },
      {
        "system": false,
        "id": "4nsjm6iw",
        "name": "value",
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
    "indexes": [
      "CREATE UNIQUE INDEX `idx_jZHmG53` ON `size_metrics` (`value`)"
    ],
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
  const collection = dao.findCollectionByNameOrId("hatflxx7dllaea7");

  return dao.deleteCollection(collection);
})
