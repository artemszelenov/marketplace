/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efbvjalsrjiwact")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mu9zgnkt",
    "name": "gender",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "men",
        "women",
        "unisex"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efbvjalsrjiwact")

  // remove
  collection.schema.removeField("mu9zgnkt")

  return dao.saveCollection(collection)
})
