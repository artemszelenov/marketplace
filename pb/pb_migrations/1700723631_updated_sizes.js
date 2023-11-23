/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vb87ozepdsyxygf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ydz3stm1",
    "name": "size",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "n3rja8gbw7q6rw6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vb87ozepdsyxygf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ydz3stm1",
    "name": "group",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "n3rja8gbw7q6rw6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
