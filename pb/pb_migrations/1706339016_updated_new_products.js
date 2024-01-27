/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6n02cjm22dcthj")

  collection.options = {
    "query": "SELECT \n  products.id,\n  products.title,\n  products.type,\n  products.description,\n  products.price, \n  products.gallery,\n  products.color\nFROM products \nWHERE products.visible = true\nORDER BY created DESC;"
  }

  // remove
  collection.schema.removeField("68dybjsi")

  // remove
  collection.schema.removeField("yemnnu7c")

  // remove
  collection.schema.removeField("f9mdtoek")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4hzldnwt",
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
    "id": "unervtli",
    "name": "type",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "c94y811k8ulmzpf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1pfy2v8k",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lh6sezev",
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
    "id": "z5gpomxw",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lv6yyrye",
    "name": "color",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "44o4eq2ahmvb8hn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6n02cjm22dcthj")

  collection.options = {
    "query": "SELECT \n  products.id,\n  products.title, \n  products.price, \n  products.gallery \nFROM products \nWHERE products.visible = true\nORDER BY created DESC;"
  }

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

  // remove
  collection.schema.removeField("4hzldnwt")

  // remove
  collection.schema.removeField("unervtli")

  // remove
  collection.schema.removeField("1pfy2v8k")

  // remove
  collection.schema.removeField("lh6sezev")

  // remove
  collection.schema.removeField("z5gpomxw")

  // remove
  collection.schema.removeField("lv6yyrye")

  return dao.saveCollection(collection)
})
