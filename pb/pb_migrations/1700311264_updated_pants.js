/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efbvjalsrjiwact")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "usk3mbkl",
    "name": "variant",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "xm6bh11t1lp04tn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efbvjalsrjiwact")

  // remove
  collection.schema.removeField("usk3mbkl")

  return dao.saveCollection(collection)
})
