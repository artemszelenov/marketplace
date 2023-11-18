/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("omzffce2yz6abij");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "omzffce2yz6abij",
    "created": "2023-11-18 09:45:45.706Z",
    "updated": "2023-11-18 09:54:27.730Z",
    "name": "clothing_sizes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pceltbyz",
        "name": "international",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL",
            "XXXL"
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
})
