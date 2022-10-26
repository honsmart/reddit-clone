const User = require("../models/user.model")
const jwt = require('jsonwebtoken')
var bcrypt = require("bcrypt")

exports.Register = async (req, res) => {
    const {
        email,
        userName,
        passWord,
        passwordConfirm
    } = req.body


    try {
        const emailExist = await User.findOne({
            email: email
        })
        const userNameExist = await User.findOne({
            userName: userName
        })

        if (emailExist) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'An account exist with this email'
            })
        }

        const newUser = User({
            email,
            userName,
            passWord,
            passwordConfirm
        })

        const saveUser = await newUser.save()

        if (saveUser) {
            return res.status(201).send({
                statusCode: "201",
                success: true,
                message: 'Success',
                user: saveUser
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


exports.Login = async (req, res) => {
    try {
        const {
            email,
            passWord,
        } = req.body

        const userEmail = email

        if (!userEmail) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'email is required'
            })
        }

        if (!passWord) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'passWord is required'
            })
        }



        const user = await User.findOne({
            email
        })

        if (!user) {
            return res.status(404).send({
                statusCode: "404",
                success: false,
                message: 'Error',
                error: 'An account doesn\'t exist with this email'
            })
        }

        const match = await bcrypt.compare(passWord, user.passWord);

        if (!match) {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'Invalid password'
            })
        }


        const token = jwt.sign({
            email
        }, process.env.JWT_pa) //will change it to .env variable for production

        const saveToken = await User.updateOne({
            email
        }, {
            Token: token
        })


        if (saveToken) {
            return res.status(200).send({
                statusCode: "200",
                success: true,
                message: 'Success',
                token: token
            })
        } else {
            return res.status(409).send({
                statusCode: "409",
                success: false,
                message: 'Error',
                error: 'An error ocurred, try again later'
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

exports.Logout = async (req, res) => {
    try {
        const saveToken = await User.updateOne({
            email: req.user.email
        }, {
            Token: null
        })

        if(saveToken){
            res.status(200).send({
                statusCode: "200",
                success: true,
                message: "Success",
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