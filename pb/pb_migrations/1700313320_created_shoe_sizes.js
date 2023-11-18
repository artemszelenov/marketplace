/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vsffkcgcs7t9tvd",
    "created": "2023-11-18 13:15:20.067Z",
    "updated": "2023-11-18 13:15:20.067Z",
    "name": "shoe_sizes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9zpp86wg",
        "name": "eu",
        "type": "text",
        "required": false,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "olx0em2m",
        "name": "uk",
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
      "CREATE UNIQUE INDEX `idx_JWdSsn6` ON `shoe_sizes` (`eu`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vsffkcgcs7t9tvd");

  return dao.deleteCollection(collection);
})
