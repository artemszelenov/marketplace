/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e7fhgxgigr0y6z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wrp2i3vt",
    "name": "gender",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "men",
        "women",
        "unisex"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e7fhgxgigr0y6z")

  // remove
  collection.schema.removeField("wrp2i3vt")

  return dao.saveCollection(collection)
})
