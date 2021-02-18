const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan'); 
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

dotenv.config({path:'./config/config.env'});

connectDB();

const transactions = require('./routes/transactions'); 

const app = express();
app.use(express.json());
app.use(cors());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions',transactions);

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('expense-tracker/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'expense-tracker','build','index.html'));
    })
}


const PORT = process.env.PORT;


app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));