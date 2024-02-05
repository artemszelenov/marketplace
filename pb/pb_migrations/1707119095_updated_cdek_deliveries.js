/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t2az8a7s1oa6a7z")

  // remove
  collection.schema.removeField("lsyrlfi1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jvnjbtzp",
    "name": "delivery",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vb0q78outcte3q9",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t2az8a7s1oa6a7z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lsyrlfi1",
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
  }))

  // remove
  collection.schema.removeField("jvnjbtzp")

  return dao.saveCollection(collection)
})
