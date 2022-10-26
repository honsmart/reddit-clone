const Subreddit = require("../models/subreddit.model")
var mongoose = require('mongoose');

exports.Create = async (req, res) => {
    const {
        name,
        title,
        description
    } = req.body

    const nameRegex = new RegExp('^[a-z0-9]+$', 'i')

    try {


        if (!nameRegex.test(name)) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error:  'Subreddit name must consist only of alphanumeric characters, and must have length at least 1'
            })
        }

        const newSubreddit = Subreddit({
            user: req.user.userName,
            name,
            title,
            description
        })

        const saveSubreddit = await newSubreddit.save()

        if (saveSubreddit) {
            return res.status(201).send({
                statusCode: "201",
                success: true,
                message: 'Subreddit created succesfully',
                Subreddit: saveSubreddit
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

exports.Edit = async (req, res) => {
    const _id = mongoose.Types.ObjectId(req.params.id);
    const {
        name,
        title,
        description
    } = req.body

    const nameRegex = new RegExp('^[a-z0-9]+$', 'i')

    try {


        if (!_id) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Invalid ID in params'
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



        const updateSubreddit = await Subreddit.updateOne({
            user: req.user.userName,
            _id
        }, {
            name,
            title,
            description
        })

        console.log(updateSubreddit)
        if (updateSubreddit) {
            return res.status(201).send({
                statusCode: "200",
                success: true,
                message: 'Subreddit updated succesfully',
                subredit: updateSubreddit
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