/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1bbf8wbkacn5czw")

  // remove
  collection.schema.removeField("exdwyve2")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1bbf8wbkacn5czw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "exdwyve2",
    "name": "visible",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
