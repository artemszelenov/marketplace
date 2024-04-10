package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `[
			{
				"id": "_pb_users_auth_",
				"created": "2023-11-16 07:43:34.751Z",
				"updated": "2024-04-10 15:02:40.458Z",
				"name": "users",
				"type": "auth",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "users_name",
						"name": "full_name",
						"type": "text",
						"required": false,
						"presentable": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "users_avatar",
						"name": "avatar",
						"type": "file",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"mimeTypes": [
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif",
								"image/webp"
							],
							"thumbs": null,
							"maxSelect": 1,
							"maxSize": 5242880,
							"protected": false
						}
					},
					{
						"system": false,
						"id": "abf8jftj",
						"name": "phone",
						"type": "text",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "gabvsdnv",
						"name": "type",
						"type": "select",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"values": [
								"supplier",
								"client"
							]
						}
					},
					{
						"system": false,
						"id": "q6xszimo",
						"name": "company_name",
						"type": "text",
						"required": false,
						"presentable": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					}
				],
				"indexes": [],
				"listRule": "id = @request.auth.id",
				"viewRule": "id = @request.auth.id",
				"createRule": "",
				"updateRule": "id = @request.auth.id",
				"deleteRule": "id = @request.auth.id",
				"options": {
					"allowEmailAuth": true,
					"allowOAuth2Auth": true,
					"allowUsernameAuth": true,
					"exceptEmailDomains": null,
					"manageRule": null,
					"minPasswordLength": 8,
					"onlyEmailDomains": null,
					"onlyVerified": false,
					"requireEmail": false
				}
			},
			{
				"id": "3n9p0uyhgeoqdd0",
				"created": "2023-11-16 07:52:51.118Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "products",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "jhsxfafc",
						"name": "title",
						"type": "text",
						"required": false,
						"presentable": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "dzvo69lh",
						"name": "description",
						"type": "editor",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"convertUrls": false
						}
					},
					{
						"system": false,
						"id": "lhfxyo8g",
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
					},
					{
						"system": false,
						"id": "ggdowac4",
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
					},
					{
						"system": false,
						"id": "mqqsfguu",
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
					},
					{
						"system": false,
						"id": "1x9pgzcx",
						"name": "group",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "1bbf8wbkacn5czw",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					},
					{
						"system": false,
						"id": "5ijyspnu",
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
					},
					{
						"system": false,
						"id": "rdyxu2wm",
						"name": "visible",
						"type": "bool",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {}
					},
					{
						"system": false,
						"id": "2ar1n7ve",
						"name": "categories",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "ebgl1y730upqqre",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": null,
							"displayFields": null
						}
					},
					{
						"system": false,
						"id": "ja7iubqd",
						"name": "weight_in_gram",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"noDecimal": false
						}
					},
					{
						"system": false,
						"id": "ghkxs903",
						"name": "supplier",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "_pb_users_auth_",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					}
				],
				"indexes": [],
				"listRule": "",
				"viewRule": "",
				"createRule": "@request.auth.id != \"\"",
				"updateRule": "@request.auth.id != \"\"",
				"deleteRule": "@request.auth.id != \"\"",
				"options": {}
			},
			{
				"id": "c6w97fwef7hrhg1",
				"created": "2023-11-16 07:59:32.668Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "orders",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "tg8ygprv",
						"name": "paid_by",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "92mwyxzdqdoon93",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					},
					{
						"system": false,
						"id": "qj5tczhi",
						"name": "state",
						"type": "select",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"values": [
								"intake",
								"completed"
							]
						}
					},
					{
						"system": false,
						"id": "yz4ujlu8",
						"name": "paid_total",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"noDecimal": false
						}
					},
					{
						"system": false,
						"id": "sh7kg3td",
						"name": "paid_delivery",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"noDecimal": false
						}
					},
					{
						"system": false,
						"id": "bcejwi1e",
						"name": "tk",
						"type": "select",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"maxSelect": 1,
							"values": [
								"cdek"
							]
						}
					}
				],
				"indexes": [],
				"listRule": null,
				"viewRule": null,
				"createRule": "",
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "94yf466xg4lpa3t",
				"created": "2023-11-16 08:00:01.938Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "order_items",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "uysstmjr",
						"name": "stock_item",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "clj15oiteijpa6x",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					},
					{
						"system": false,
						"id": "ymcw7irc",
						"name": "quantity",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": 1,
							"max": null,
							"noDecimal": true
						}
					},
					{
						"system": false,
						"id": "ypidqus4",
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
					},
					{
						"system": false,
						"id": "nro7qzja",
						"name": "order",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "c6w97fwef7hrhg1",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					}
				],
				"indexes": [],
				"listRule": null,
				"viewRule": null,
				"createRule": "",
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "ebgl1y730upqqre",
				"created": "2023-11-18 10:16:57.253Z",
				"updated": "2024-04-10 15:58:29.782Z",
				"name": "categories",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "44n9a5br",
						"name": "title",
						"type": "text",
						"required": true,
						"presentable": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "a8r7nh9d",
						"name": "value",
						"type": "text",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					}
				],
				"indexes": [
					"CREATE UNIQUE INDEX ` + "`" + `idx_wkehybt` + "`" + ` ON ` + "`" + `categories` + "`" + ` (` + "`" + `value` + "`" + `)"
				],
				"listRule": "",
				"viewRule": "",
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "44o4eq2ahmvb8hn",
				"created": "2023-11-18 11:01:23.225Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "colors",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "wciehf5i",
						"name": "title",
						"type": "text",
						"required": true,
						"presentable": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "sohfot4s",
						"name": "value",
						"type": "text",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					}
				],
				"indexes": [
					"CREATE UNIQUE INDEX ` + "`" + `idx_ZvQFDoS` + "`" + ` ON ` + "`" + `colors` + "`" + ` (` + "`" + `value` + "`" + `)"
				],
				"listRule": "",
				"viewRule": "",
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "c94y811k8ulmzpf",
				"created": "2023-11-18 14:01:31.098Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "product_types",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "xqamf7dn",
						"name": "title",
						"type": "text",
						"required": false,
						"presentable": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
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
					}
				],
				"indexes": [
					"CREATE UNIQUE INDEX ` + "`" + `idx_fWZ16Ld` + "`" + ` ON ` + "`" + `product_types` + "`" + ` (` + "`" + `value` + "`" + `)"
				],
				"listRule": "",
				"viewRule": "",
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "vb87ozepdsyxygf",
				"created": "2023-11-19 09:29:31.034Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "sizes",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "cd0amnsg",
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
					},
					{
						"system": false,
						"id": "p4b4rzv7",
						"name": "metric",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "hatflxx7dllaea7",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					},
					{
						"system": false,
						"id": "ydz3stm1",
						"name": "group",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "n3rja8gbw7q6rw6",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					}
				],
				"indexes": [],
				"listRule": "",
				"viewRule": "",
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "1bbf8wbkacn5czw",
				"created": "2023-11-19 09:51:46.502Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "product_groups",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "ybbcpcdh",
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
					},
					{
						"system": false,
						"id": "zlboab88",
						"name": "sku",
						"type": "text",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					}
				],
				"indexes": [],
				"listRule": "",
				"viewRule": "",
				"createRule": "@request.auth.id != \"\"",
				"updateRule": "@request.auth.id != \"\"",
				"deleteRule": "@request.auth.id != \"\"",
				"options": {}
			},
			{
				"id": "hatflxx7dllaea7",
				"created": "2023-11-20 17:56:59.268Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "size_metrics",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "2achsxlp",
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
					},
					{
						"system": false,
						"id": "4nsjm6iw",
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
					}
				],
				"indexes": [
					"CREATE UNIQUE INDEX ` + "`" + `idx_jZHmG53` + "`" + ` ON ` + "`" + `size_metrics` + "`" + ` (` + "`" + `value` + "`" + `)"
				],
				"listRule": "",
				"viewRule": "",
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "clj15oiteijpa6x",
				"created": "2023-11-20 18:05:27.564Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "stock_items",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "1nf1ckfe",
						"name": "product",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "3n9p0uyhgeoqdd0",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					},
					{
						"system": false,
						"id": "kbef0sn4",
						"name": "size_group",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "n3rja8gbw7q6rw6",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					},
					{
						"system": false,
						"id": "94ino9xy",
						"name": "count",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"noDecimal": true
						}
					},
					{
						"system": false,
						"id": "n8oolqhy",
						"name": "_pb_title",
						"type": "text",
						"required": false,
						"presentable": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					}
				],
				"indexes": [],
				"listRule": "",
				"viewRule": "",
				"createRule": "@request.auth.id != \"\"",
				"updateRule": "@request.auth.id != \"\"",
				"deleteRule": "@request.auth.id != \"\"",
				"options": {}
			},
			{
				"id": "n3rja8gbw7q6rw6",
				"created": "2023-11-20 18:16:41.942Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "size_groups",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "2eeibvdt",
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
					}
				],
				"indexes": [
					"CREATE UNIQUE INDEX ` + "`" + `idx_J2QIAkn` + "`" + ` ON ` + "`" + `size_groups` + "`" + ` (` + "`" + `title` + "`" + `)"
				],
				"listRule": "",
				"viewRule": "",
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "llf3zhp9r061tua",
				"created": "2023-12-05 05:40:44.723Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "carts",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "wme5lt6b",
						"name": "belongs_to",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "92mwyxzdqdoon93",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					}
				],
				"indexes": [],
				"listRule": "",
				"viewRule": "",
				"createRule": "",
				"updateRule": "",
				"deleteRule": "",
				"options": {}
			},
			{
				"id": "o5ltnj7c6630dhf",
				"created": "2023-12-05 05:45:51.157Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "cart_items",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "ukfzhlk9",
						"name": "stock_item",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "clj15oiteijpa6x",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					},
					{
						"system": false,
						"id": "u0otiti3",
						"name": "quantity",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"noDecimal": false
						}
					},
					{
						"system": false,
						"id": "pskevpjv",
						"name": "cart",
						"type": "relation",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "llf3zhp9r061tua",
							"cascadeDelete": false,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					},
					{
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
					}
				],
				"indexes": [],
				"listRule": "",
				"viewRule": "",
				"createRule": "",
				"updateRule": "",
				"deleteRule": "",
				"options": {}
			},
			{
				"id": "wxk0fw4wuwjryc5",
				"created": "2024-01-14 05:50:33.232Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "packages",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "yjxsnqqb",
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
					},
					{
						"system": false,
						"id": "fvnttsot",
						"name": "length_sm",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"noDecimal": false
						}
					},
					{
						"system": false,
						"id": "rmegkkoj",
						"name": "height_sm",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"noDecimal": false
						}
					},
					{
						"system": false,
						"id": "qd64faeq",
						"name": "width_sm",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"noDecimal": false
						}
					}
				],
				"indexes": [
					"CREATE UNIQUE INDEX ` + "`" + `idx_AiHbM5s` + "`" + ` ON ` + "`" + `packages` + "`" + ` (` + "`" + `title` + "`" + `)"
				],
				"listRule": null,
				"viewRule": null,
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "kp7zw4ttqoscqgl",
				"created": "2024-01-18 07:39:00.942Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "docs",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "yl7dvyaq",
						"name": "slug",
						"type": "text",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "etd4pgfu",
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
					},
					{
						"system": false,
						"id": "i5xz4ght",
						"name": "body",
						"type": "editor",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"convertUrls": false
						}
					}
				],
				"indexes": [
					"CREATE UNIQUE INDEX ` + "`" + `idx_NXSVgjM` + "`" + ` ON ` + "`" + `docs` + "`" + ` (` + "`" + `slug` + "`" + `)"
				],
				"listRule": "",
				"viewRule": "",
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "92mwyxzdqdoon93",
				"created": "2024-02-06 16:24:42.539Z",
				"updated": "2024-04-10 15:02:40.459Z",
				"name": "guests",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "k7elkqcw",
						"name": "full_name",
						"type": "text",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "qnpbtbn0",
						"name": "phone",
						"type": "text",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "rxnkflle",
						"name": "social_network",
						"type": "text",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "bkxeqc9o",
						"name": "nickname",
						"type": "text",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "9v1wz9zx",
						"name": "email",
						"type": "text",
						"required": false,
						"presentable": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					}
				],
				"indexes": [],
				"listRule": "",
				"viewRule": "",
				"createRule": "",
				"updateRule": "",
				"deleteRule": null,
				"options": {}
			},
			{
				"id": "0pt8iv2yguybxjb",
				"created": "2024-04-03 13:53:24.392Z",
				"updated": "2024-04-10 16:14:51.848Z",
				"name": "product_teasers",
				"type": "view",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "lfqqyzln",
						"name": "title",
						"type": "text",
						"required": false,
						"presentable": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "tjzjyjcv",
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
					},
					{
						"system": false,
						"id": "bujghfxw",
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
					}
				],
				"indexes": [],
				"listRule": "",
				"viewRule": "",
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {
					"query": "SELECT\n  id,\n  title,\n  price,\n  gallery,\n  created\nFROM products\nWHERE visible = true;"
				}
			},
			{
				"id": "9hk3quizcsfkkcg",
				"created": "2024-04-10 16:22:00.802Z",
				"updated": "2024-04-10 16:50:16.966Z",
				"name": "product_teasers_men",
				"type": "view",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "gokvplpn",
						"name": "title",
						"type": "text",
						"required": false,
						"presentable": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "fs6cii0c",
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
					},
					{
						"system": false,
						"id": "l7uzmvob",
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
					}
				],
				"indexes": [],
				"listRule": "",
				"viewRule": "",
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {
					"query": "SELECT\n  id,\n  title,\n  price,\n  gallery,\n  created\nFROM products\nWHERE visible = true AND categories LIKE '%q41n2xw5msimz2r%';"
				}
			},
			{
				"id": "98v1dx1ont6r0og",
				"created": "2024-04-10 16:50:48.025Z",
				"updated": "2024-04-10 16:51:04.035Z",
				"name": "product_teasers_women",
				"type": "view",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "jwevtux5",
						"name": "title",
						"type": "text",
						"required": false,
						"presentable": true,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "pxlfoxea",
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
					},
					{
						"system": false,
						"id": "gnkzarno",
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
					}
				],
				"indexes": [],
				"listRule": "",
				"viewRule": "",
				"createRule": null,
				"updateRule": null,
				"deleteRule": null,
				"options": {
					"query": "SELECT\n  id,\n  title,\n  price,\n  gallery,\n  created\nFROM products\nWHERE visible = true AND categories LIKE '%e4h3ygj7n3r04n8%';"
				}
			}
		]`

		collections := []*models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collections); err != nil {
			return err
		}

		return daos.New(db).ImportCollections(collections, true, nil)
	}, func(db dbx.Builder) error {
		return nil
	})
}
