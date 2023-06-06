const express = require('express');
const { connection } = require('./config/db');
const { UserRouter } = require('./Routes/user');
const { PostRouter } = require('./Routes/post');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use("/api",UserRouter)
app.use("/api/posts",PostRouter)

//home endpoint
app.get("/",(req,res)=>{
    res.send('Welcome to Social Media App' )
})

//server listening 
app.listen(process.env.port,()=>{
    try {
        connection
        console.log("connected to db");
        console.log(`listening on port ${process.env.port}`);

    } catch (error) {
        console.log(`error while listening port :  ${error}`)
    }

})


