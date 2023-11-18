/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e7fhgxgigr0y6z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ttvzb9v0",
    "name": "size",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vsffkcgcs7t9tvd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e7fhgxgigr0y6z")

  // remove
  collection.schema.removeField("ttvzb9v0")

  return dao.saveCollection(collection)
})
