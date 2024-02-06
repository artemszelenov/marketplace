/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6w97fwef7hrhg1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tg8ygprv",
    "name": "paid_by",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "92mwyxzdqdoon93",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6w97fwef7hrhg1")

  // remove
  collection.schema.removeField("tg8ygprv")

  return dao.saveCollection(collection)
})
