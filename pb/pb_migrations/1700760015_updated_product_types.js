/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c94y811k8ulmzpf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ehxasdsi",
    "name": "value",
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
  const collection = dao.findCollectionByNameOrId("c94y811k8ulmzpf")

  // remove
  collection.schema.removeField("ehxasdsi")

  return dao.saveCollection(collection)
})
