const { connect } = require("mongoose")
require('dotenv').config()
const Products = require('./model')


const getProducts = async (req, res) => {

    try {
		const { shop_id } = req.query;
        await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        const products = await Products.find({ shop_id })
        res.json({ products })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//getAllProducts
const getAllProducts = async (req, res) => {

    try {
		await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        const products = await Products.find()
        res.json({ products })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
            
const addProduct = async (req, res) => {
    const { title,shop_id, thumbnail, description, price, category, images, stock } = req.body

    if (!title || !shop_id || !thumbnail || !description || !price || !category || !images || !stock) {
        res.status(400).json({ message: 'Input Field empty' })
    }

    else {
        try {
            await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

            await Products.create({ title, shop_id, thumbnail, description, price, category, images, stock })
            const products = await Products.find()
            res.status(201).json({
                message: "Product Created Successfully",
                products
            })
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

}

const ProductbyCategory = async (req, res) => {
    const { category } = req.params
    if (!category) {
        res.status(403).json({ message: "Missing product Name" })
    }
    else {
        await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        const products = await Products.find({ category })
        res.json({ products })
    }
}

const ProductbyId = async (req, res) => {
    const { _id } = req.params
    if (!_id) {
        res.status(403).json({ message: "Missing Product ID" })
    }
    else {
        try {
            await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            const products = await Products.findOne({ _id })
            res.json({ products })
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }
}

const deleteProducts = async (req, res) => {
    const { _id } = req.body

    if (!_id) {
        res.status(404).json({
            message: "Missing product ID"
        })
    }
    else {
        try {
            await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            await Products.deleteOne({ _id })
            res.status(200).json({
                message: "Product Successfullly deleted"
                
            })

        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }


    }
}

module.exports = { getAllProducts, deleteProducts, getProducts, addProduct, ProductbyCategory, ProductbyId }