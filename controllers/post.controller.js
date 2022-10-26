const Subreddit = require("../models/subreddit.model")
const Post = require("../models/post.model")
var mongoose = require('mongoose');

exports.Create = async (req, res) => {
    const {
        post_type,
        body,
        name,
        title,
        subreddit_id,
        description
    } = req.body

    const nameRegex = new RegExp('^[a-z0-9]+$', 'i')


    try {
        if (!post_type) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Must specify post type'
            })
        }

        if (!body) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Must specify body'
            })
        }

        if (!name) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Must specify name'
            })
        }

        if (!title) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Must specify title'
            })
        }

        if (!subreddit_id) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Must specify subreddit id'
            })
        }

        const ObjectId_subreddit = mongoose.Types.ObjectId(subreddit_id)

        if (!description) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Must specify description'
            })
        }

        if (!ObjectId_subreddit) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Invalid subreddit Id'
            })
        }


        if (!nameRegex.test(name)) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Subreddit name must consist only of alphanumeric characters, and must have length at least 1'
            })
        }

        const foundSubreddit = await Subreddit.findOne({
            _id: ObjectId_subreddit
        })

        if (!foundSubreddit) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Subreddit does not exist'
            })
        }

        const newPost = Post({
            post_type,
            body,
            name,
            author: req.user.userName,
            title,
            subreddit_id: ObjectId_subreddit,
            description
        })

        const savePost = await newPost.save()

        if (savePost) {
            return res.status(201).send({
                statusCode: "201",
                success: true,
                message: 'Post created succesfully',
                Post: savePost
            })
        }

    } catch (e) {
        res.status(500).send({
            statusCode: "500",
            success: false,
            message: "An error occured",
            error: e.message
        })
    }
}