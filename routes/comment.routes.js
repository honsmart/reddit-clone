var express = require('express');
var router = express.Router();
var commentController = require("../controllers/comment.controller")
var authMiddleWare = require("../middlewares/auth.middleware")


/**
  @swagger
 * /comment/create:
 *   post:
 *     summary: Create comment
 *     description: Creat new comment under post
 *     tags:
 *       - Comment
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   post_id:
 *                      type: string
 *                      example: 6358042b98f7a61570fc8a02
 *                   body:
 *                       type: string
 *                       example: Nice post 
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
 *                         example: Subreddit created succesfully
 *                 Comment:
 *                         type: string
 *                         description: token.
 *                         example: {"post_id": "63585c9467ba44b8ec3a27de", "author": "honsmart", "body": "ss", "_id": "6358a3f59684040ad30a710f", "createdAt": "2022-10-26T03:05:25.583Z", "updatedAt": "2022-10-26T03:05:25.583Z", "__v": 0}
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
router.post('/create', authMiddleWare, commentController.Create);


module.exports = router;