/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ebgl1y730upqqre")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_wkehybt` ON `categories` (`value`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "44n9a5br",
    "name": "ru_title",
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
  const collection = dao.findCollectionByNameOrId("ebgl1y730upqqre")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_nhB5Vqr` ON `categories` (`title`)",
    "CREATE UNIQUE INDEX `idx_wkehybt` ON `categories` (`value`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "44n9a5br",
    "name": "title",
    "type": "text",
    "required": true,
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
