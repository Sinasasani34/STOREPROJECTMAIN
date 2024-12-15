// Chapter(Admin-Panel)

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddCapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id: 
 *                      type: string
 *                      example: 6279e994c1e47a98d0f356d3
 *                  title: 
 *                      type: string
 *                      example: chapter 1 zero - hero javascript 
 *                  text:
 *                      type: string
 *                      example: the describe about this chapter
 *          EditCapter:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      example: chapter 1 zero - hero javascript 
 *                  text:
 *                      type: string
 *                      example: the describe about this chapter
 */

/**
 * @swagger
 *  definitions:
 *      chaptersOfCourseDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties: 
 *                              _id:
 *                                  type: string
 *                                  example: 6752c514167d7035ff2d4c1b
 *                              title:
 *                                  type: string
 *                                  example: title of course
 *                              chpaters:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                  example: [{_id: 6752c514167d7035ff2d4c1b, title: "title of chapter", text: text of chapter}]
 */

/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [Chapter(Admin-Panel)]
 *          summary: create new chapter for courses
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/chapter/list/{courseID}:
 *      get:
 *          tags: [Chapter(Admin-Panel)]
 *          summary: get chapters of courses
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/chaptersOfCourseDefinition'
 */
/**
 * @swagger
 *  /admin/chapter/remove/{chapterID}:
 *      patch:
 *          tags: [Chapter(Admin-Panel)]
 *          summary: remove a Chapter of courses
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/chapter/update/{chapterID}:
 *      patch:
 *          tags: [Chapter(Admin-Panel)]
 *          summary: update detail of Chapter
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditCapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditCapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */