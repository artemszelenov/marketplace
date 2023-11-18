/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efbvjalsrjiwact")

  collection.name = "pants"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("efbvjalsrjiwact")

  collection.name = "shirts"

  return dao.saveCollection(collection)
})
