const mongoose = require("mongoose");

const subredditSchema = mongoose.Schema({
    user: {
        required: [true],
        type: String,
    },
    name: {
        required: [true, 'name is required'],
        type: String,
    },
    title: {
        required: [true, 'title is required'],
        type: String,
    },
    description: {
        required: [true, 'description is required'],
        type: String,
    }
}, {
    timestamps: true,
});

const subRedditModel = mongoose.model("subreddit", subredditSchema);

module.exports = subRedditModel;