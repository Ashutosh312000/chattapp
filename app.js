const path = require('path'); 
const fs=require('fs')

const express = require('express');
const dotenv=require('dotenv')
dotenv.config()

const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const User=require('./models/user');
const Message=require('./models/message');


const cors=require('cors');

const app = express();



app.use(cors({
  origin:"*",
}
  
));

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');



app.use('/user', userRoutes);
app.use('/message', messageRoutes);


User.hasMany(Message);
Message.belongsTo(User);

sequelize
  // .sync({ force: true })
  .sync()
  .then(result=>{
   app.listen(3000);
  })
