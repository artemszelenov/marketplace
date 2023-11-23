/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7ofqnbzmxq1qr34")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pc8ejii4",
    "name": "delivery_method",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "p7z0vkca61sczji",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7ofqnbzmxq1qr34")

  // remove
  collection.schema.removeField("pc8ejii4")

  return dao.saveCollection(collection)
})
