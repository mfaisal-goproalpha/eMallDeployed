const express = require("express")
const cookieParser = require('cookie-parser');
const app = express()
require("dotenv").config()
const port = process.env.PORT || 3000
const cors = require("cors")
const path = require("path")
require("./Helper/db_connection")

const clientSidpath = path.join(__dirname, "./client/dist")
app.use(("/", express.static(clientSidpath)))

// Use the cookie-parser middleware
app.use(cookieParser());

app.use(express.json())
app.use(cors())

app.use("/api", require("./APIs/User/router"))
app.use("/api", require("./APIs/Shop/router"))
app.use("/api", require("./APIs/Category/router"))
app.use("/api", require("./APIs/Products/router"))
app.use("/api", require("./APIs/Order/router"))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"), function(err){
        res.status(500).send(err);
    })
})


app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})