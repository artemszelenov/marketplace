/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "44o4eq2ahmvb8hn",
    "created": "2023-11-18 11:01:23.225Z",
    "updated": "2023-11-18 11:01:23.225Z",
    "name": "colors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "eiixxhyi",
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
      "CREATE UNIQUE INDEX `idx_ZvQFDoS` ON `colors` (`title`)"
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
  const collection = dao.findCollectionByNameOrId("44o4eq2ahmvb8hn");

  return dao.deleteCollection(collection);
})
