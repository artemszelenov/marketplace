/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp7zw4ttqoscqgl")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_NXSVgjM` ON `docs` (`slug`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "etd4pgfu",
    "name": "title",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yl7dvyaq",
    "name": "slug",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kp7zw4ttqoscqgl")

  collection.indexes = []

  // remove
  collection.schema.removeField("etd4pgfu")

  // remove
  collection.schema.removeField("yl7dvyaq")

  return dao.saveCollection(collection)
})
