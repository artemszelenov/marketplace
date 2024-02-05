/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o5ltnj7c6630dhf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "krg8ffte",
    "name": "price",
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
  const collection = dao.findCollectionByNameOrId("o5ltnj7c6630dhf")

  // remove
  collection.schema.removeField("krg8ffte")

  return dao.saveCollection(collection)
})
