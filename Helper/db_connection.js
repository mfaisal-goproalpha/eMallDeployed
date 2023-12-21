const mongoos = require("mongoose")

mongoos.connect(process.env.DB_URL)
.then(() =>{
    console.log("DB connected")
})
.catch((err) =>{
    console.log(err.message)
})

mongoos.connection.on("error", (err) => {
    console.log(err.message)
})

mongoos.connection.on("connected", () => {
    // console.log("DataBase connection is seccessfullly on")
})
mongoos.connection.on("disconnected", () => {
    // console.log("DataBase connection is seccessfullly closed")
})

process.on("SIGINT",async () =>{
    await mongoos.connection.close()
    process.exit(0)
})