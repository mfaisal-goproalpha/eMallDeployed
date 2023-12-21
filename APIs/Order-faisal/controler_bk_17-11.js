const nodemailer = require("nodemailer");
require('dotenv').config()
var Mailgen = require('mailgen');
const { connect } = require("mongoose");
const Order = require('./model');
const { json } = require("express");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});     

const addOrders = async (req, res) => {
    const { items, totalBill, customerId, customerName, customerEmail, customerAddress } = req.body;

    if (!customerName || !customerId || !customerEmail || !customerAddress){
        res.json({
            message: "Customer Address and Customer email not found"
        })
    }
    else{
    try {
        await connect(process.env.DB_URL);
        const order = await Order.create({ items, totalBill, customerId, customerName, customerEmail, customerAddress });
        console.log(order._id);

        // Data for the email
        const emailData = {
            productTitle: "",
            productCategory:"",
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
            to: customerEmail,
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
        await connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        const Orders = await Order.find()
        res.json(
            {
                data: categories
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


module.exports = { addOrders, orderbyId, allorders,  }