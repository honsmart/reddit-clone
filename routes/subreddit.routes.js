var express = require('express');
var router = express.Router();
var subredditController = require("../controllers/subreddit.controller")
var authMiddleWare = require("../middlewares/auth.middleware")

/**
  @swagger
 * /subreddit/create:
 *   post:
 *     summary: Create Subreddit
 *     description: Logout your account
 *     tags:
 *       - Subreddit
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   name:
 *                      type: string
 *                   title:
 *                      type: string
 *                   description:
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
 *                         example: Subreddit created succesfully
 *                 Subreddit:
 *                         type: string
 *                         description: token.
 *                         example: {"user": "honsmart", "name": "1", "title": "hey", "description": "hey", "_id": "63589ff4f30e837ff565cd7a", "createdAt": "2022-10-26T02:48:20.118Z", "updatedAt": "2022-10-26T02:48:20.118Z", "__v": 0}
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
router.post('/create', authMiddleWare, subredditController.Create);

/**
  @swagger
 * /subreddit/edit/:id:
 *   put:
 *     summary: Edit Subreddit
 *     description: Edit Subreddit
 *     tags:
 *       - Subreddit
 *     requestBody:
 *        content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   name:
 *                      type: string
 *                   title:
 *                      type: string
 *                   description:
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
 *                         example: Subreddit updated succesfully
 *                 subredit:
 *                         type: string
 *                         description: token.
 *                         example: {"acknowledged": true, "modifiedCount": 1, "upsertedId": null, "upsertedCount": 0, "matchedCount": 1}
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
router.put('/edit/:id', authMiddleWare, subredditController.Edit);


module.exports = router;