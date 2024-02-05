/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vb0q78outcte3q9")

  // remove
  collection.schema.removeField("47nx0vqp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "olsghl8c",
    "name": "completed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vb0q78outcte3q9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "47nx0vqp",
    "name": "tk",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "cdek"
      ]
    }
  }))

  // remove
  collection.schema.removeField("olsghl8c")

  return dao.saveCollection(collection)
})
