/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e7fhgxgigr0y6z")

  // remove
  collection.schema.removeField("msdruy25")

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

  // update
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e7fhgxgigr0y6z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "msdruy25",
    "name": "size_metric",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "uk",
        "eu"
      ]
    }
  }))

  // remove
  collection.schema.removeField("hiabev7s")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tnfszlvi",
    "name": "size_value",
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
