/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vrljs3vkro8wrsc",
    "created": "2023-11-16 10:20:58.559Z",
    "updated": "2023-11-16 10:20:58.559Z",
    "name": "shoes_sizes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kusoh5zu",
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
  const collection = dao.findCollectionByNameOrId("vrljs3vkro8wrsc");

  return dao.deleteCollection(collection);
})
