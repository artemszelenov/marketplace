/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44o4eq2ahmvb8hn")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_ZvQFDoS` ON `colors` (`_pb_title`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sohfot4s",
    "name": "value",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eiixxhyi",
    "name": "_pb_title",
    "type": "text",
    "required": false,
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
  const collection = dao.findCollectionByNameOrId("44o4eq2ahmvb8hn")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_ZvQFDoS` ON `colors` (`title`)"
  ]

  // remove
  collection.schema.removeField("sohfot4s")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eiixxhyi",
    "name": "title",
    "type": "text",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
