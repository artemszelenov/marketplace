/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vb0q78outcte3q9",
    "created": "2024-02-05 07:39:21.866Z",
    "updated": "2024-02-05 07:39:21.866Z",
    "name": "deliveries",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jx8jdfsh",
        "name": "order",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "c6w97fwef7hrhg1",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "47nx0vqp",
        "name": "tk",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "cdek"
          ]
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
  const collection = dao.findCollectionByNameOrId("vb0q78outcte3q9");

  return dao.deleteCollection(collection);
})
