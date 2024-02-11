/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "llf3zhp9r061tua",
    "created": "2024-02-11 16:43:52.064Z",
    "updated": "2024-02-11 16:43:52.064Z",
    "name": "carts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wme5lt6b",
        "name": "belongs_to",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "92mwyxzdqdoon93",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("llf3zhp9r061tua");

  return dao.deleteCollection(collection);
})
