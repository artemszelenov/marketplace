/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("44o4eq2ahmvb8hn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wciehf5i",
    "name": "ru_value",
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
  const collection = dao.findCollectionByNameOrId("44o4eq2ahmvb8hn")

  // remove
  collection.schema.removeField("wciehf5i")

  return dao.saveCollection(collection)
})
