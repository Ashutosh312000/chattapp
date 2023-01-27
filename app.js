const path = require('path'); 
const fs=require('fs')

const express = require('express');
const dotenv=require('dotenv')
dotenv.config()

const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const User=require('./models/user');


const cors=require('cors');

const app = express();



app.use(cors({
  origin:"http://123.0.0.1:4000",
  // methods:['GET','POST'],
}
  
));

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/user');



app.use('/user', userRoutes);


sequelize
  // .sync({ force: true })
  .sync()
  .then(result=>{
   app.listen(3000);
  })
