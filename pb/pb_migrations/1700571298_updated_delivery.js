/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7ofqnbzmxq1qr34")

  collection.name = "deliveries"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7ofqnbzmxq1qr34")

  collection.name = "delivery"

  return dao.saveCollection(collection)
})
