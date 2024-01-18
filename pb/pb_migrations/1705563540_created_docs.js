/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "kp7zw4ttqoscqgl",
    "created": "2024-01-18 07:39:00.942Z",
    "updated": "2024-01-18 07:39:00.942Z",
    "name": "docs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "i5xz4ght",
        "name": "body",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      }
    ],
    "indexes": [],
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
  const collection = dao.findCollectionByNameOrId("kp7zw4ttqoscqgl");

  return dao.deleteCollection(collection);
})
