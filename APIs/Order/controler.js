const nodemailer = require("nodemailer");
var Mailgen = require('mailgen');
require('dotenv').config()
const { connect } = require("mongoose")
const BillingSchema = require("./billingSchema");
const shippingSchema = require("./ShippingSchema");
const Product = require("./productSchema");
const Order = require("./OrderSchema");
const { response } = require("express");


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

const addOrders = async (req, res) => {
    const { items, totalBill, customerId, customerName, customerEmail, customerAddress } = req.body;
	

    if (!customerName || !customerId || !customerEmail || !customerAddress) {
        res.json({
            message: "Customer Address and Customer email not found"
        })
    }
    else {
        try {
			
            const order = await Order.create({ items, totalBill, customerId, customerName, customerEmail, customerAddress });
            console.log(order._id);

            // Data for the email
            const emailData = {
                productTitle: "",
                productCategory: "",
                totalBill: totalBill,
                customerName: customerName,
                customerEmail: customerEmail,
                customerAddress: customerAddress,
                trackingId: order._id,
            };

            if (items.length > 0) {
                emailData.productTitle = items[0].title; // Use the title of the first item
                emailData.productCategory = items[0].category; // Use the category of the first item
            }
            // Create a Mailgen instance
            const mailGenerator = new Mailgen({
                theme: "default",
                product: {
                    link: "https://mailgen.js",
                    name: "Mailgen",
                    productTitle: emailData.productTitle,
                    tracking: emailData.trackingId,
                    category: emailData.productCategory,
                    total: emailData.totalBill,
                    customerName: emailData.customerName,
                    customerEmail: emailData.customerEmail,
                    customerAddress: emailData.customerAddress,
                },
            });

            // Prepare email content
            const email = {
                body: {
                    name: emailData.customerName,
                    intro: "Your order details:",
                    table: {
                        data: [
                            {
                                item: "Product Title",
                                description: emailData.productTitle,
                            },
                            {
                                item: "Tracking ID",
                                description: emailData.trackingId,
                            },
                            {
                                item: "Product Category",
                                description: emailData.productCategory,
                            },
                            {
                                item: "Total Bill",
                                description: emailData.totalBill,
                            },
                            {
                                item: "Customer Name",
                                description: emailData.customerName,
                            },
                            {
                                item: "Customer Email",
                                description: emailData.customerEmail,
                            },
                            {
                                item: "Customer Address",
                                description: emailData.customerAddress,
                            },
                        ],
                        columns: {
                            customWidth: {
                                item: "20%",
                                description: "80%",
                            },
                        },
                    },
                    outro: "Thank you for your order!",
                },
            };

            // Generate the email content
            const emailBody = mailGenerator.generate(email);

            // Send the email
            const mailOptions = {
                from: process.env.NODEMAILER_EMAIL,
                teo: customrEmail,
                subject: "Your oreder has been placed",
                html: emailBody,
            };

            // Send the email and handle the response
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    res.status(500).json({
                        message: "Error sending email",
                        error: err,
                    });
                } else {
                    res.status(200).json({
                        message: "Order Placed Successfully",
                        order,
                        emailResponse: info.response,
                    });
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Error placing order", error: error });
        }
    }
};

const allorders = async (req, res) => {
    try {
		const { shop_id } = req.query;
        await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        const Orders = await Order.find({ shop_id })
        res.json(
            {
                data: Orders
            })
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}

//getcustomerorders
const getcustomerorders = async (req, res) => {
    try {
		const { user_id } = req.query;
        await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        const Orders = await Order.find({ user_id })
        res.json(
            {
                data: Orders
            })
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}

const orderbyId = async (req, res) => {
    const { _id } = req.params

    try {
		
        await connect(process.env.DB_URI)
        const order = await Order.findOne({ _id })
        res.json({ order })
    }

    catch (error) {
        res.json({ message: "Not found" })

    }
}

const addShippingAndBilling = async (req, res, next) => {
    try {
        const { userId, orderId, billformData, shipformData } = req.body

        const billOrder = new BillingSchema({
            userId: userId,
            orderId: orderId,
            fname: billformData.fname,
            lname: billformData.lname,
            phoneNo: billformData.phoneNo,
            email: billformData.email,
            country: billformData.country,
            city: billformData.city,
            zipCode: billformData.zipCode,
            streetAddress: billformData.streetAddress
        })

        await billOrder.save()

        const shipOrder = new shippingSchema({
            userId: userId,
            orderId: orderId,
            fname: shipformData.fname,
            lname: shipformData.lname,
            phoneNo: shipformData.phoneNo,
            email: shipformData.email,
            country: shipformData.country,
            city: shipformData.city,
            zipCode: shipformData.zipCode,
            streetAddress: shipformData.streetAddress
        })

        await shipOrder.save()

        res.json({
          message:"Order successfully submitted"
        })

    } catch (error) {
    next(error)
}
}

const createOrder = async (req, res, next) => {
    try {
        const { product, subTotal, shop_id, user_id} = req.body

         const createOrder = new Order({
            subTotal,shop_id,user_id
        })
        await createOrder.save()

        let createOrderProductArray = []
        product.map(async (val, key) => {
            const createOrderProducts = new Product({
                orderId: createOrder._id,
                shop_id: shop_id,
                productId: val._id,
                Quantity: val.count
            })

            await createOrderProducts.save()
            createOrderProductArray.push(createOrderProducts)
        })


        res.json({
            orderid: createOrder._id,
        })
    } catch (error) {
        console.log(error)
    }
}

const fetchOrder = async (req, res, next) => {
    try {

        const Orders = await order.find()
        res.json(
            {
                Orders
            })
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}

const productByOrderId = async (req, res, next) => {
    try {
        const { _id } = req.params

        const orderProducts = await Product.find({ orderId: _id })
        res.json({
            orderProducts
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports = { addOrders, orderbyId, allorders, getcustomerorders, addShippingAndBilling, createOrder, fetchOrder, productByOrderId }