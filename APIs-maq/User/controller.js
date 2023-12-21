const { connect } = require('mongoose')
require('dotenv').config()
const User = require('./schema')
const JWT = require("jsonwebtoken")
const { jsonRefreshToken, jsonAccessToken } = require("../../Helper/jwtTokens")
require("dotenv").config()



const signup = async (req, res) => {
    // data from request body
    const { formData
    } = req.body;
    try {
        // connect database
        // chek for the existance of email in database.
        if (await User.exists({ email: formData.email })) {
            res.json({
                message: "Email already exist"
            })
        }
        else {
            const newUser = new User({
                fname: formData.fname,
                lname: formData.lname,
                phoneNo: formData.phoneNo,
                email: formData.email,
                country: formData.country,
                city: formData.city,
                zipCode: formData.zipCode,
                streetAddress: formData.streetAddress,
                password: formData.password,
                confirmPasswrod: formData.confirmPasswrod
            })

            await newUser.save()

            res.status(200).json({
                success: "successfully register"
            })
        }

    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}


const singin = async (req, res) => {
    const { email, password } = req.body;
    if ((!email || !password)) {
        res.json({
            message: "Input field empty"
        })
    }
    else {
        try {
            const findUser = await User.findOne({ email: email })
            if (!findUser) {
                res.json({
                    message: "User does not found"
                })
            }
            else {
                // chack for password
                const decryptPwd = await findUser.isValidPassword(password)

                if (email == findUser.email && decryptPwd) {
                        const user= {
                            _id:findUser._id,
                            fname:findUser.fname,
                            lname: findUser.lname,
                            email: findUser.email
                        }

                    res.json({
                        user
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
        const allusers = await User.find()
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

module.exports = { signup, singin, alluser,  }