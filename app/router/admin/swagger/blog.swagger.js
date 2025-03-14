/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *          BlogUpdate:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  category:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 */ 

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [ Blog(Admin-Panel)]
 *          summary: get all blogs 
 *          responses: 
 *              200: 
 *                  description: success - get array of blogs
 */

/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [ Blog(Admin-Panel)]
 *          summary: create blog document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses: 
 *              201: 
 *                  description: create
 */

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          summary: get blog and populate with id 
 *          tags: [Blog(Admin-Panel)]
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
 *  /admin/blogs/{id}:
 *      delete:
 *          summary: remove blog with id 
 *          tags: [Blog(Admin-Panel)]
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
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [ Blog(Admin-Panel)]
 *          summary: update  Blog document by id 
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/BlogUpdate'
 *          responses:
 *              200:
 *                  description: success
 */
