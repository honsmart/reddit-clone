const jwt = require('jsonwebtoken')
const User = require("../models/user.model")

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_pa)

        if (!token) {
            return res.status(401).send({
                statusCode: "401",
                success: false,
                message: "Error",
                error: 'Token not provided'
            })
        }


        const authUser = await User.findOne({
            email: decoded.email,
            Token: token
        })

        if (authUser) {
            req.token = token
            req.user = authUser
            next()
        }else{
            return res.status(401).send({
                statusCode: "401",
                success: false,
                message: "Error",
                error: 'Invalid token provided'
            })   
        }

    } catch (e) {
        console.log(e)
        return res.status(401).send({
            statusCode: "401",
            success: false,
            message: "Error",
            error: 'Please Autheticate'
        })
    }

}

module.exports = auth