/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vsffkcgcs7t9tvd")

  // remove
  collection.schema.removeField("olx0em2m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e0kla3s0",
    "name": "uk",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vsffkcgcs7t9tvd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "olx0em2m",
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

  // remove
  collection.schema.removeField("e0kla3s0")

  return dao.saveCollection(collection)
})
