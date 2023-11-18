/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3n9p0uyhgeoqdd0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s3za3zvq",
    "name": "variants",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "xm6bh11t1lp04tn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3n9p0uyhgeoqdd0")

  // remove
  collection.schema.removeField("s3za3zvq")

  return dao.saveCollection(collection)
})
