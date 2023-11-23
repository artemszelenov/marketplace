/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("94yf466xg4lpa3t")

  // remove
  collection.schema.removeField("1iimlbmz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uysstmjr",
    "name": "stock_item",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "clj15oiteijpa6x",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1iimlbmz",
    "name": "product",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "3n9p0uyhgeoqdd0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("uysstmjr")

  return dao.saveCollection(collection)
})
