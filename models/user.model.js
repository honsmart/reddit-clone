var mongoose = require("mongoose");
var validator = require("validator")
var bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'That email address is taken'],
        lowercase: true,
        validate: [validator.isEmail, "Enter a valid email address."]
    },
    userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'That username is taken'],
        lowercase: true,
        validate: [validator.isAlphanumeric, 'Usernames may only have letters and numbers.']
    },
    passWord: {
        type: String,
        required: [true, "Password is required."],
        minLength: [4, 'password should be at least four characters']
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (el) {
                return el === this.passWord;
            },
            message: 'Passwords don\'t match.'
        }
    },
    Token: {
        type: String
    },
}, {
    timestamps: true,
});


userSchema.pre('save', async function (next) {
    this.passWord = await bcrypt.hash(this.passWord, 12);
    this.passwordConfirm = undefined;
    next();
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;