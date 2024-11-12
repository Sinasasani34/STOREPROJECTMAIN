const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: بخش احراض هویت یوزر در سکشن user-auth section
 */

/**
 * @swagger
 * /user/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in user panel with phone number
 *          description: one time password(OTP)
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400: 
 *                  description: bad request
 *              401: 
 *                  description: UnAuthorization
 *              500:
 *                  description: InternalServerError
 */
router.post("/get-otp", UserAuthController.getOtp)

/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check otp value in user controller
 *          description: check one time password with code- mobile and expires data
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code recived
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400: 
 *                  description: bad request
 *              401: 
 *                  description: UnAuthorization
 *              500:
 *                  description: InternalServerError
 */

router.post("/check-otp", UserAuthController.checkOtp)
module.exports = {
    UserAuthRoutes: router
}