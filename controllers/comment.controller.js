const Post = require("../models/post.model")
const Comment = require("../models/comment.model")
var mongoose = require('mongoose');

exports.Create = async (req, res) => {
    const {
        post_id,
        body
    } = req.body



    try {
        if (!body) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Must specify body'
            })
        }

        if (!post_id) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Must specify post id'
            })
        }


        const ObjectId_postid = mongoose.Types.ObjectId(post_id)

        if (!ObjectId_postid) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Invalid post Id'
            })
        }


        const foundPost = await Post.findOne({
            _id: ObjectId_postid
        })

        if (!foundPost) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Post does not exist'
            })
        }

        const newComment = Comment({
            post_id: ObjectId_postid,
            body,
            author: req.user.userName,
        })

        const saveComment = await newComment.save()

        if (saveComment) {
            return res.status(201).send({
                statusCode: "201",
                success: true,
                message: 'Success',
                Comment: saveComment
            })
        }

    } catch (e) {
        res.status(500).send({
            statusCode: "500",
            success: false,
            message: "Error",
            error: e.message
        })
    }
}