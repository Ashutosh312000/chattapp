
const User=require('../models/user');
const Message=require('../models/message');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const isstringvalid=(string)=>{
    if(string=="" || string==undefined){
        return true;
    }
    else{
        return false;
    }
}

exports.postmessage=(req,res,next)=>{
    const message=req.body.message;
    if(isstringvalid(message)){
        return res.json({message:'Fill Up The Blank Spaces'})
     }
     else{
        Message.create({Message:message,userId:req.user.id})
        .then((message)=>{
            res.status(201).json({message:"Message Is Sent",message})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({message:"Something Is Wrong"})
        })
     }
}

exports.getmessage=async (req,res,next)=>{
    try{
        const {lastmessageid}=req.query;
        console.log(lastmessageid);
        if(lastmessageid==undefined){
            const messages =await Message.findAll({
                include:[    
                    {
                        model:User,
                        attributes:['Name']
                    }
                ]
            })
            return res.status(200).json(messages);
        }
        else{
            const messages =await Message.findAll({
                where:{id :{[Op.gt]: lastmessageid}},
                include:[    
                    {
                        model:User,
                        attributes:['Name']
                    }
                ]
            })
            return res.status(200).json(messages);
    }

    }
    catch(err){
        console.log(err)
        res.status(500).json({err})
    }
     
}









