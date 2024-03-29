const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

//mongodb function
connectDB();

const transactions = require('./routes/transactions');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// app.get('/', (req,res) => res.send('Hello')); //open postman http://localhost:5000/ you will see hello there.
app.use('/api/v1/transactions', transactions); //whenever we use this url its gonna call the transactions file


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));