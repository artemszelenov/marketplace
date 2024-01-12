/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c94y811k8ulmzpf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xqamf7dn",
    "name": "ru_title",
    "type": "text",
    "required": false,
    "presentable": true,
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
  const collection = dao.findCollectionByNameOrId("c94y811k8ulmzpf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xqamf7dn",
    "name": "ru_title",
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
