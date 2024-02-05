/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("p7z0vkca61sczji");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "p7z0vkca61sczji",
    "created": "2023-11-21 12:57:41.323Z",
    "updated": "2023-11-21 12:57:41.323Z",
    "name": "delivery_methods",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "j0jp0ibd",
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
    "indexes": [
      "CREATE UNIQUE INDEX `idx_xUE7uJr` ON `delivery_methods` (`title`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
