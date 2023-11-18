/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e7fhgxgigr0y6z")

  // remove
  collection.schema.removeField("hiabev7s")

  // remove
  collection.schema.removeField("tnfszlvi")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e7fhgxgigr0y6z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hiabev7s",
    "name": "eu",
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
    "id": "tnfszlvi",
    "name": "uk",
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
