
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const isstringvalid=(string)=>{
    if(string=="" || string==undefined){
        return true;
    }
    else{
        return false;
    }
}



exports.postuser=(req,res,next)=>{
    
    const {name,phoneno,email,password}=req.body.userdetails;
    if(isstringvalid(name) ||isstringvalid(email) || isstringvalid(password)){
       return res.json({message:'Fill Up The Blank Spaces'})
    }
    else{
        const saltrounds=10;
        bcrypt.hash(password,saltrounds, (err,hash)=>{
          User.create({Name:`${name}`,Phone_No:`${phoneno}`,Email:`${email}`,Password:`${hash}`})
          .then(()=>{
            res.status(201).json({message:'Your Account Is Created'});
          })
          .catch((err)=>{
            res.json({message:'Email Already Exists'})
        })    
        })
    }
    
}




