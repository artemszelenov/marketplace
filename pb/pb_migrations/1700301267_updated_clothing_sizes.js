/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("omzffce2yz6abij")

  // remove
  collection.schema.removeField("kcablo0y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pceltbyz",
    "name": "international",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "XXXL"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("omzffce2yz6abij")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kcablo0y",
    "name": "international",
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

  // remove
  collection.schema.removeField("pceltbyz")

  return dao.saveCollection(collection)
})
