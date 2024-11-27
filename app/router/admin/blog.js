const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [ Blog(AdminPanel)]
 *          summary: get all blogs 
 *          parameters:
 *              -   in: header
 *                  example: Bearer token...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAyNzU4NzU2NiIsImlhdCI6MTczMjYwODUyOCwiZXhwIjoxNzMyNjEyMTI4fQ.GbtCNsuUAT9DQMJ0jOMtYRyde15MTQQMGf9LgQKLVSs
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          responses: 
 *              200: 
 *                  description: success - get array of blogs
 */
router.get("/", AdminBlogController.getListOfBlogs)
/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [ Blog(AdminPanel)]
 *          summary: create blog document
 *          consumes: 
 *              -   multipart/from-data
 *              -   application/x-www-from-data-urlencoded
 *          parameters:
 *              -   in: header
 *                  example: Bearer token...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAyNzU4NzU2NiIsImlhdCI6MTczMjYwODUyOCwiZXhwIjoxNzMyNjEyMTI4fQ.GbtCNsuUAT9DQMJ0jOMtYRyde15MTQQMGf9LgQKLVSs
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: tag
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required: true
 *                  type: file
 *          responses: 
 *              201: 
 *                  description: create
 */
router.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog)
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          summary: get blog and populate with id 
 *          tags: [Blog(AdminPanel)]
 *          parameters:
 *              -   in: header
 *                  example: Bearer token...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAyNzU4NzU2NiIsImlhdCI6MTczMjYwODUyOCwiZXhwIjoxNzMyNjEyMTI4fQ.GbtCNsuUAT9DQMJ0jOMtYRyde15MTQQMGf9LgQKLVSs
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200: 
 *                  description: success
 */
router.get("/:id", AdminBlogController.getOneBlogById)
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete:
 *          summary: remove blog with id 
 *          tags: [Blog(AdminPanel)]
 *          parameters:
 *              -   in: header
 *                  example: Bearer token...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAyNzU4NzU2NiIsImlhdCI6MTczMjYwODUyOCwiZXhwIjoxNzMyNjEyMTI4fQ.GbtCNsuUAT9DQMJ0jOMtYRyde15MTQQMGf9LgQKLVSs
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200: 
 *                  description: success
 */
router.delete("/:id", AdminBlogController.deleteBlogById)
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [ Blog(AdminPanel)]
 *          summary: Update blog document by id
 *          consumes: 
 *              -   multipart/from-data
 *          parameters:
 *              -   in: header
 *                  example: Bearer token...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTAyNzU4NzU2NiIsImlhdCI6MTczMjYwODUyOCwiZXhwIjoxNzMyNjEyMTI4fQ.GbtCNsuUAT9DQMJ0jOMtYRyde15MTQQMGf9LgQKLVSs
 *                  name: access-token
 *                  required: true
 *                  type: string
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *              -   in: formData
 *                  name: tag
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *          responses: 
 *              201: 
 *                  description: create
 */
router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.updateBlogById)
module.exports = {
    BlogAdminApiRoutes: router
}