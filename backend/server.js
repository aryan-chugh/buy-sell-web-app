require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const itemRoutes = require("./routes/itemPageRoutes");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const profileRoutes = require("./routes/profileRoutes");
const searchRoutes = require("./routes/searchRoutes");
const orderRoutes = require("./routes/ordersRoutes");
const cartRoutes = require("./routes/cartRoutes");
const listItemRoutes = require("./routes/listItemRoutes");
const chatRoutes = require("./routes/chatRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const dotenv = require('dotenv');
const connectDB = require('./config/db');

const cors = require('cors');
// const { default: OrdersDashboard } = require('../frontend/src/pages/Orders');

// express app 
const app = express();

app.use(express.json())

// middleware that runs first before the middleware
// app.use((req, res, next) => {
//     console.log(req.path, req.method)
//     next()
// });


app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend to access backend
}));

// attaches all of the routes to the app at the following path
// app.use(tmpRoutes)
app.use('/item', itemRoutes)
app.use('/register', registerRoutes)
app.use('/login', loginRoutes);
app.use('/profile', profileRoutes)
app.use('/search', searchRoutes)
app.use('/orders', orderRoutes)
app.use('/mycart', cartRoutes);
app.use('/list', listItemRoutes);
app.use('/chatbot', chatRoutes);
app.use('/reviews', reviewRoutes);
// responds to a get request coming in
// app.get('/', (req, res) => {
//     // sends back a json string for us
//     res.json({msg: 'Welcome to the app'});
// })

// listen for requests
// app.listen(process.env.PORT, () => {
//     console.log('listening on port', process.env.PORT)
// })

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT);
    })
}).catch((error) => {
    console.log(error);
});
