/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "123091iowdq91203912ws"
 *                                  title:
 *                                      type: string
 *                                      example: "title of role"
 *                                  description:
 *                                      type: string
 *                                      example: "desc of role"
 *                                  permission:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  example: "123091iowdq91203912ws"
 *                                              title:
 *                                                  type: string
 *                                                  example: "title of permission"
 *                                              description:
 *                                                  type: string
 *                                                  example: "describe the permission"
 *                                          
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the description of role
 *                  permissions:
 *                      type: array
 *                      description: the permissionID for role
*/
/**
 * @swagger
 *  components:
 *      schemas:
 *          EditRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the description of role
 *                  permissions:
 *                      type: array
 *                      description: the permissionID for role
*/

// *                      $ref: '#/components/schemas/Permissions'
/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-Role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the description of role
 *                  permissions:
 *                      $ref: '#/components/schemas/Permissions'
 */

/**
 * @swagger
 *  /admin/role/list:
 *      get:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: get list of role's
 *          responses:
 *              200:
 *                  description: created new Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfRoles'
 */

/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: create new role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
 *          
 *          responses:
 *              201:
 *                  description: created new Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/role/update/{id}:
 *      patch:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: update role
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
 *                          $ref: '#/components/schemas/EditRole'
 *          
 *          responses:
 *              200:
 *                  description: update Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/role/remove/{field}:
 *      delete:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: remove the Role
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true    
 *                  description: send title of role or objectId of role for remove that    
 *          responses:
 *              200:
 *                  description: removed Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */