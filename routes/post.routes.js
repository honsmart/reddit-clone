var express = require('express');
var router = express.Router();
var postController = require("../controllers/post.controller")
var authMiddleWare = require("../middlewares/auth.middleware")

/**
  @swagger
 * /post/create:
 *   post:
 *     summary: Create post
 *     description: Creat new post under subreddit
 *     tags:
 *       - Post
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
 *                         example: Post created succesfully
 *                 Post:
 *                         type: string
 *                         description: token.
 *                         example: {"post_type": "hey", "title": "ws", "body": "new iphone", "author": "honsmart", "subreddit_id": "63581c6109f0f7756ab94849", "description": "s", "_id": "63585d06ee615e7e2e3cba64", "createdAt": "2022-10-25T22:02:46.409Z", "updatedAt": "2022-10-25T22:02:46.409Z", "__v": 0}
 *       500:
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
router.post('/create', authMiddleWare, postController.Create);


module.exports = router;