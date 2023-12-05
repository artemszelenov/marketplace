/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "llf3zhp9r061tua",
    "created": "2023-12-05 05:40:44.723Z",
    "updated": "2023-12-05 05:40:44.723Z",
    "name": "carts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5llv6ges",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("llf3zhp9r061tua");

  return dao.deleteCollection(collection);
})
