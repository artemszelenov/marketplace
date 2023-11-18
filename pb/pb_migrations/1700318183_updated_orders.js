/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6w97fwef7hrhg1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tkrpclnn",
    "name": "closed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6w97fwef7hrhg1")

  // remove
  collection.schema.removeField("tkrpclnn")

  return dao.saveCollection(collection)
})
