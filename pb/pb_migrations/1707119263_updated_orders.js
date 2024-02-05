/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6w97fwef7hrhg1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c99aqbxc",
    "name": "delivery",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vb0q78outcte3q9",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qj5tczhi",
    "name": "state",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "intake",
        "completed"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c6w97fwef7hrhg1")

  // remove
  collection.schema.removeField("c99aqbxc")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qj5tczhi",
    "name": "state",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "intake",
        "closed"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
