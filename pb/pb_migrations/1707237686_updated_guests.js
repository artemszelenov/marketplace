/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92mwyxzdqdoon93")

  collection.listRule = ""
  collection.viewRule = ""
  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("92mwyxzdqdoon93")

  collection.listRule = "id = @request.auth.id"
  collection.viewRule = null
  collection.updateRule = "id = @request.auth.id"

  return dao.saveCollection(collection)
})
