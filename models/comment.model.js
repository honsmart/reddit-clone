const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    post_id: {
        type: String,
        required: [true, 'post_id is required'],
    },
    author: {
        type: String,
        required: [true, 'author is required'],
    },
    body: {
        type: String,
        required: [true, 'body is required'],
    },
}, {
    timestamps: true,
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;