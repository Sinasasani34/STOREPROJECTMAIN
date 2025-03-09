/**
 * @swagger
 *  definitions:
 *      ListOfCategories:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "673c5b2f87a453ccba8c9688"
 *                                  title: 
 *                                      type: string
 *                                      example: "title of category"
 *                                  children: 
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  example: "673c5b2f87a453ccba8c9688"
 *                                              title:
 *                                                  type: string
 *                                                  example: "children of parent in category"
 *                                              parent:
 *                                                  type: string
 *                                                  example: "673c5b2f87a453ccba8c9688"
 *                  
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: the title of category
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(Admin-Panel)]
 *          summary: create new category title
 *          parameters: 
 *              -   in: header
 *                  example: Bearer token...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAyNzU4NzU2NiIsImlhdCI6MTczMjYwODUyOCwiZXhwIjoxNzMyNjEyMTI4fQ.GbtCNsuUAT9DQMJ0jOMtYRyde15MTQQMGf9LgQKLVSs
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: Get All parents of categorys or Category Heads
 *          responses: 
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: Get All children of parents categorys or Category Heads
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: Get All categories
 *          responses: 
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCategories'
 */

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Category(Admin-Panel)]
 *          summary: remove category with object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: get all categories without populate and nested structure
 *          responses: 
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: find category with object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(Admin-Panel)]
 *          summary: update category title with object id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses: 
 *              200:
 *                  description: success
 *              500:
 *                  description: InternalServerError
 */