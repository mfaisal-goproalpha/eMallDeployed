const Joi = require("@hapi/joi")

const user_schema = Joi.object({
    fname: Joi.string().lowercase().required(),
    lname: Joi.string().lowercase().required(),
    phoneNo: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    country: Joi.string().lowercase().required(),
    city: Joi.string().lowercase().required(),
    zipCode: Joi.number().lowercase().required(),
    streetAddress: Joi.string().lowercase().required(),
    password: Joi.string().min(8).required().max(20).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?/])(?=.*\d).+/
    ),
    confirmPasswrod: Joi.string().min(8).required().max(20).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?/])(?=.*\d).+/
    ),
})

const login_schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),

})

module.exports = {user_schema, login_schema}