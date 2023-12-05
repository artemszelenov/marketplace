/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("clj15oiteijpa6x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n8oolqhy",
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
  const collection = dao.findCollectionByNameOrId("clj15oiteijpa6x")

  // remove
  collection.schema.removeField("n8oolqhy")

  return dao.saveCollection(collection)
})
