const express = require('express')
const app =express();
const cors= require('cors')
const port= process.env.PORT || 6001
const mongoose = require('mongoose');
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-client.ok1xabi.mongodb.net/demo-foodi-client?retryWrites=true&w=majority&appName=demo-foodi-client`)
.then(
    console.log("MongoDB Connected Successfully!")
)
    .catch((error) => console.log("Error connecting to MongoDB", error));

// import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes')
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes)


app.get('/', (req, res) => 
{
res.send('Hello World!')
})
app.listen(port, () => {
console.log("Example app listening on port ${port}")
})