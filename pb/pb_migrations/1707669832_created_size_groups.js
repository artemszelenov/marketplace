/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "n3rja8gbw7q6rw6",
    "created": "2024-02-11 16:43:52.061Z",
    "updated": "2024-02-11 16:43:52.061Z",
    "name": "size_groups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2eeibvdt",
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
      "CREATE UNIQUE INDEX `idx_J2QIAkn` ON `size_groups` (`title`)"
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
  const collection = dao.findCollectionByNameOrId("n3rja8gbw7q6rw6");

  return dao.deleteCollection(collection);
})
