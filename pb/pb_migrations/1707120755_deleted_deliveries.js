/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vb0q78outcte3q9");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "vb0q78outcte3q9",
    "created": "2024-02-05 07:39:21.866Z",
    "updated": "2024-02-05 08:04:34.692Z",
    "name": "deliveries",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "olsghl8c",
        "name": "completed",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
})
