/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3n9p0uyhgeoqdd0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rdyxu2wm",
    "name": "visible",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3n9p0uyhgeoqdd0")

  // remove
  collection.schema.removeField("rdyxu2wm")

  return dao.saveCollection(collection)
})
