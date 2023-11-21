/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "x6n02cjm22dcthj",
    "created": "2023-11-21 06:35:41.046Z",
    "updated": "2023-11-21 06:35:41.046Z",
    "name": "product_teasers",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yzb9h8ur",
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
      },
      {
        "system": false,
        "id": "o2i1papa",
        "name": "price",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "ys3f9t5u",
        "name": "gallery",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 20,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/jpeg",
            "image/avif",
            "image/webp",
            "image/png",
            "image/vnd.mozilla.apng"
          ],
          "thumbs": [],
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  products.id,\n  products.title, \n  products.price, \n  products.gallery \nFROM products \nWHERE products.visible = true;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("x6n02cjm22dcthj");

  return dao.deleteCollection(collection);
})
