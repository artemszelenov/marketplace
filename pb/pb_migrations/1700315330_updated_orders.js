/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6w97fwef7hrhg1")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_KFOJv4k` ON `orders` (`track_number`)"
  ]

  // remove
  collection.schema.removeField("wfumr9pi")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oejru7qo",
    "name": "track_number",
    "type": "text",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6w97fwef7hrhg1")

  collection.indexes = []

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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oejru7qo",
    "name": "track_number",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
