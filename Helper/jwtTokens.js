const JWT = require('jsonwebtoken')
const createError = require('http-errors')
require("dotenv").config()

jsonAccessToken = (user) => {
    const payload = {
        id: user,
    }
    console.log("user payload", payload)

    const key = process.env.ACCESS_KEY
    const option = {
        issuer: "example.com",
        audience: user.id
    }
    return new Promise((resolve, reject) => {
        JWT.sign(payload, key, option, ((err, token) => {
            if (err) reject(createError.InternalServerError("Error in verification of access token"))
            resolve(token)
        }))
    })
}

veryAccessToken = (req, res, next) => {

    if (!req.headers['authorization']) return next(createError.Unauthorized("Access token error"))

    const authHeader = req.headers["authorization"]
    const bearerToken = authHeader.split(" ")
    const token = bearerToken[1]
    JWT.verify(token, process.env.ACCESS_KEY, (err, payload) => {
        if (err) {
            // if (err.name === 'JsonWebTokenError') {
            //     return next(createError.Unauthorized())
            // }
            // else{
            //     return next(createError.Unauthorized("Falst Error  "+ err.message))
            // }
            const message = err.name ==="JsonWebTokenError"? "Unauthorized": err.message
            return next(createError.Unauthorized(message))
        }
        res.payload = payload
        next()
    })
}


jsonRefreshToken = (user) => {
    const payload = {
        id: user._id,
    }
    const key = process.env.REFRESH_KEY
    const option = {
        expiresIn:"1d",
        issuer: "example.com",
        audience: user.id
    }
    return new Promise((resolve, reject) => {
        JWT.sign(payload, key, option, ((err, token) => {
            if (err) reject(createError.InternalServerError())
            resolve(token)
        }))
    })
}


verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) =>{
        console.log(" Token in varification " +refreshToken)
            JWT.verify(refreshToken, process.env.REFRESH_KEY, (err, payload) =>{
                if (err) return reject(createError.Unauthorized())
                const user = payload
                resolve(user)
            })
    })
}


module.exports = { jsonAccessToken, veryAccessToken, jsonRefreshToken, verifyRefreshToken}