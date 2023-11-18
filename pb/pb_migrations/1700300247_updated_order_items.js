/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("94yf466xg4lpa3t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kti9x6un",
    "name": "delivery_state",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "accepted",
        "shipped",
        "received"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("94yf466xg4lpa3t")

  // remove
  collection.schema.removeField("kti9x6un")

  return dao.saveCollection(collection)
})
