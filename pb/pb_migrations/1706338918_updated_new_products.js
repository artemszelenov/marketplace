/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6n02cjm22dcthj")

  collection.options = {
    "query": "SELECT \n  products.id,\n  products.title, \n  products.price, \n  products.gallery \nFROM products \nWHERE products.visible = true\nORDER BY created DESC;"
  }

  // remove
  collection.schema.removeField("kg52nek8")

  // remove
  collection.schema.removeField("uluvlzw2")

  // remove
  collection.schema.removeField("zkwjiikb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "68dybjsi",
    "name": "title",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yemnnu7c",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f9mdtoek",
    "name": "gallery",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/avif",
        "image/webp",
        "image/png",
        "image/vnd.mozilla.apng"
      ],
      "thumbs": [],
      "maxSelect": 20,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6n02cjm22dcthj")

  collection.options = {
    "query": "SELECT \n  products.id,\n  products.title, \n  products.price, \n  products.gallery \nFROM products \nWHERE products.visible = true\nORDER BY created ASC;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kg52nek8",
    "name": "title",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uluvlzw2",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zkwjiikb",
    "name": "gallery",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/avif",
        "image/webp",
        "image/png",
        "image/vnd.mozilla.apng"
      ],
      "thumbs": [],
      "maxSelect": 20,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // remove
  collection.schema.removeField("68dybjsi")

  // remove
  collection.schema.removeField("yemnnu7c")

  // remove
  collection.schema.removeField("f9mdtoek")

  return dao.saveCollection(collection)
})
