/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "c94y811k8ulmzpf",
    "created": "2023-11-18 14:01:31.098Z",
    "updated": "2023-11-18 14:01:31.098Z",
    "name": "product_types",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xqamf7dn",
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
      "CREATE UNIQUE INDEX `idx_TQ7N46t` ON `product_types` (`title`)"
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
  const collection = dao.findCollectionByNameOrId("c94y811k8ulmzpf");

  return dao.deleteCollection(collection);
})
