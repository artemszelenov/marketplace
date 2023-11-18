/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xm6bh11t1lp04tn")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_HpoZkrc` ON `product_variants` (`title`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "auwi4vq8",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xm6bh11t1lp04tn")

  collection.indexes = []

  // remove
  collection.schema.removeField("auwi4vq8")

  return dao.saveCollection(collection)
})
