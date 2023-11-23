/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7ofqnbzmxq1qr34",
    "created": "2023-11-21 12:53:27.280Z",
    "updated": "2023-11-21 12:53:27.280Z",
    "name": "delivery",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "987b48hh",
        "name": "track_number",
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
  const collection = dao.findCollectionByNameOrId("7ofqnbzmxq1qr34");

  return dao.deleteCollection(collection);
})
