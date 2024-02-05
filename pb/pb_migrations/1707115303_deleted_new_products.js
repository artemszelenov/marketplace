/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("x6n02cjm22dcthj");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "x6n02cjm22dcthj",
    "created": "2023-11-21 06:35:41.046Z",
    "updated": "2024-01-27 07:03:36.264Z",
    "name": "new_products",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4hzldnwt",
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
        "id": "unervtli",
        "name": "type",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "c94y811k8ulmzpf",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "1pfy2v8k",
        "name": "description",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "lh6sezev",
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
        "id": "z5gpomxw",
        "name": "gallery",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [
            "image/jpeg",
            "image/avif",
            "image/webp",
            "image/png",
            "image/vnd.mozilla.apng"
          ],
          "thumbs": [],
          "maxSelect": 20,
          "maxSize": 5242880,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "lv6yyrye",
        "name": "color",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "44o4eq2ahmvb8hn",
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
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  products.id,\n  products.title,\n  products.type,\n  products.description,\n  products.price, \n  products.gallery,\n  products.color\nFROM products \nWHERE products.visible = true\nORDER BY created DESC;"
    }
  });

  return Dao(db).saveCollection(collection);
})
