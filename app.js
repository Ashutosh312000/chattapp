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
  origin:"http://123.0.0.1:4000", //1) only this origin will be allowed and dont use local host use 124.0.0.1:4000
  // methods:['GET','POST'], //2) methods tells  ki yeh yeh methods allowed hai, by default all is allowed 
  //3)optins is a preflight request send to check is asked method is allowed on this origin or not
  //get ,post dont need options preflight requests where as put, delete etc needs
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
