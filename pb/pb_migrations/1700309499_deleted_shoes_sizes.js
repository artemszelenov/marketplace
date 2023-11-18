/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vrljs3vkro8wrsc");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "vrljs3vkro8wrsc",
    "created": "2023-11-16 10:20:58.559Z",
    "updated": "2023-11-18 09:42:08.981Z",
    "name": "shoes_sizes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "m6dn9aqn",
        "name": "heel_toe",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kusoh5zu",
        "name": "eu",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "abxd8ea5",
        "name": "uk",
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
})
