/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("94yf466xg4lpa3t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "quloei1s",
    "name": "delivery",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "7ofqnbzmxq1qr34",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("94yf466xg4lpa3t")

  // remove
  collection.schema.removeField("quloei1s")

  return dao.saveCollection(collection)
})
