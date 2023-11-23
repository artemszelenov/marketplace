/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c94y811k8ulmzpf")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_fWZ16Ld` ON `product_types` (`value`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c94y811k8ulmzpf")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_TQ7N46t` ON `product_types` (`title`)"
  ]

  return dao.saveCollection(collection)
})
