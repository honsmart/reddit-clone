const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    post_type: {
        type: String,
        required: [true, 'post_type is required'],
    },
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    body: {
        type: String,
        required: [true, 'body is required'],
    },
    author: {
        type: String,
        required: [true, 'author_id is required'],
    },
    subreddit_id: {
        type: String,
        required: [true, 'subreddit_id is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    }
}, {
    timestamps: true,
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;