/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("llf3zhp9r061tua")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("llf3zhp9r061tua")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
})
