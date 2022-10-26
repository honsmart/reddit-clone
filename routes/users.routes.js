var express = require('express');
var router = express.Router();
var userController = require("../controllers/auth.controller")
var authMiddleWare = require("../middlewares/auth.middleware")

/**
  @swagger
 * /users/register:
 *   post:
 *     summary: Register a new account
 *     description: Registe a new account
 *     tags:
 *       - Users
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   email:
 *                      type: string
 *                   userName:
 *                      type: string
 *                   passWord:
 *                      type: string
 *                   passwordConfirm:
 *                      type: string
 *     responses:
 *       200:
 *         description: Succuess.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                         type: string
 *                         description: status code.
 *                         example: 201
 *                 success:
 *                         type: boolean
 *                         description: success.
 *                         example: true
 *                 message:
 *                         type: string
 *                         description: Success.
 *                         example: Success
 *                 user:
 *                         type: string
 *                         description: token.
 *                         example: {"email": "adegboye@gmail.com", "userName": "adegboye", "_id": "6358a093c97def6618767d12", "createdAt": "2022-10-26T02:50:59.787Z", "updatedAt": "2022-10-26T02:50:59.787Z", "__v": 0}
 *       500:
 *         description: Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                         type: string
 *                         description: status code.
 *                         example: 500
 *                 success:
 *                         type: boolean
 *                         description: success.
 *                         example: false
 *                 message:
 *                         type: string
 *                         description: Success.
 *                         example: Error
 *                 error:
 *                         type: string
 *                         description: token.
 *                         example: An error ocurred, try again.
*/

router.post('/register', userController.Register);

/**
  @swagger
 * /users/login:
 *   post:
 *     summary: Login to your account
 *     description: Login with your email and password
 *     tags:
 *       - Users
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   email:
 *                      type: string
 *                   passWord:
 *                      type: string
 *     responses:
 *       200:
 *         description: Succuess.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                         type: string
 *                         description: status code.
 *                         example: 201
 *                 success:
 *                         type: boolean
 *                         description: success.
 *                         example: true
 *                 message:
 *                         type: string
 *                         description: Success.
 *                         example: Success
 *                 token:
 *                         type: string
 *                         description: token.
 *                         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZWdib3llb3BleWVtaUBnbWFpbC5jb20iLCJpYXQiOjE2NjY3NDQyNjh9.VHgj2bGXanMkvIo1FjzCCRuIt4FEdgVj5ws0i7pMkhg
 *       500:
 *         description: Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                         type: string
 *                         description: status code.
 *                         example: 500
 *                 success:
 *                         type: boolean
 *                         description: success.
 *                         example: false
 *                 message:
 *                         type: string
 *                         description: Success.
 *                         example: Error
 *                 error:
 *                         type: string
 *                         description: token.
 *                         example: An error ocurred, try again.


*/

router.post('/login', userController.Login);

/**
  @swagger
 * /users/logout:
 *   post:
 *     summary: Logout
 *     description: Logout your account
 *     tags:
 *       - Users
*     responses:
 *       200:
 *         description: Succuess.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                         type: string
 *                         description: status code.
 *                         example: 200
 *                 success:
 *                         type: boolean
 *                         description: success.
 *                         example: true
 *                 message:
 *                         type: string
 *                         description: Success.
 *                         example: Success
 *       500:
 *         description: Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                         type: string
 *                         description: status code.
 *                         example: 500
 *                 success:
 *                         type: boolean
 *                         description: success.
 *                         example: false
 *                 message:
 *                         type: string
 *                         description: Success.
 *                         example: Error
 *                 error:
 *                         type: string
 *                         description: token.
 *                         example: An error ocurred, try again.
*/
router.post('/logout', authMiddleWare, userController.Logout);


module.exports = router;