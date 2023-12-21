const { connect } = require('mongoose')
require('dotenv').config()
const User = require('./model')
const { hash, compare } = require("bcryptjs")
const JWT = require("jsonwebtoken")

const signup = async (req, res) => {
    // data from request body
    const { username, email, full_name, password, address } = req.body;
    try {
        // connect database
        await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        // chek for the existance of email in database.
        // if (await User.exists({ email })) {
        //     res.status(401).json({
        //         message: "Username or Email already exist"
        //     })
        // }

        await User.create({ username, email, full_name, password: await hash(password, 12), address })
        res.status(200).json({
            message: "Successfully Registerd"
        })
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}


const singin = async (req, res) => {
    console.log('signin method in User/controler file => ', req.body);
    const { email, password } = req.body;
    if ((!email || !password)) {
        res.json({
            message: "Input field empty"
        })
    }
    else {
        try {
            // connect database
            await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

            // If @ include in input field then its email otherwise its Username
            // find user through email or username in database
            const findUser = await User.findOne({ email: email })
            if (!findUser) {
                res.json({
                    message: "User does not found"
                })
            }
            else {
                // chack for password
                const decryptPwd = await compare(password, findUser.password)
                if (email == findUser.email && decryptPwd) {
                    // generate a JWT token for user to identify the authenticate user
                    const user = {
                        id: findUser._id,
                        username: findUser.username,
                        full_name: findUser.full_name,
                        email: findUser.email,
                        dp: findUser.dp,
                        role: findUser.role,
                        address: findUser.address
                    }

                    const token = JWT.sign({
                        id: findUser._id,
                        username: findUser.username,
                        full_name: findUser.full_name,
                        email: findUser.email,
                        dp: findUser.dp,
                        role: findUser.role,
                        address: findUser.address
                    }, process.env.JWT_KEY)
                    res.json({
                        token: token, user:user
                    })
                }
                else {
                    res.json({
                        message: "Email or password invalid"
                    })
                }
            }
        } catch (error) {
            res.json({
                message: error.message
            })
        }

    }
}

const alluser = async (req, res) => {
    try {
        await connect(process.env.DB_URL, {  useNewUrlParser: true, useUnifiedTopology: true})

        const allusers = await User.find()
        console.log(allusers)
        res.json(
            {
                allusers
            })
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}


module.exports = { signup, singin, alluser }