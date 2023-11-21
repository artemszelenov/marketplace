/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3n9p0uyhgeoqdd0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ggdowac4",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3n9p0uyhgeoqdd0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ggdowac4",
    "name": "gallery",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 99,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
