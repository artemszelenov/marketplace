/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6w97fwef7hrhg1")

  collection.name = "orders"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wfumr9pi",
    "name": "delivered",
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

  collection.name = "order"

  // remove
  collection.schema.removeField("wfumr9pi")

  return dao.saveCollection(collection)
})
