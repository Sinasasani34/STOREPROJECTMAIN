/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: reviced code from getOTP 
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   RefreshToken
 *              properties:
 *                  RefreshToken:
 *                      type: string
 *                      description: Enter Refresh Token To Get Fresh token and refresh token
 */

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
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
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

/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check otp value in user controller
 *          description: check one time password with code- mobile and expires data
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/CheckOTP'
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

/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: send refresh token for get new refresh token
 *          description: fresh token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/RefreshToken'
 *          responses:
 *              200:
 *                  description: success
 */
