const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash, compare } = require('bcrypt')


const user_Schema = new Schema({
    fname: {
        type: String,
        lowercase: true,
        required: true
    },
    lname: {
        type: String,
        lowercase: true,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    country: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    zipCode: {
        type: String,
        require: true,
    },
    streetAddress: {
        type: String,
        require: true,
    },

    joiningDate: {
        type: Date,
        defaul: Date.now
    },
    password: {
        type: String,
        require: true,
    },
    confirmPasswrod: {
        type: String,
        require: true,
    }
})

user_Schema.pre('save', async function (next) {
    try {
        this.password = await hash(this.password, 10)
        next()
    } catch (error) {
        next(error)
    }
})

user_Schema.pre('save', async function (next) {
    try {
        this.confirmPasswrod = await hash(this.confirmPasswrod, 10)
        next()
    } catch (error) {
        next(error)
    }
})

user_Schema.methods.isValidPassword = async function (password) {
    try {
        return await compare(password, this.password)
    } catch (error) {
        throw error
    }
}

const User = mongoose.model("user", user_Schema)
module.exports = User