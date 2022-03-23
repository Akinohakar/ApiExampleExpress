const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')

const loginRouter=require('express').Router()
const User = require("../models/User")

loginRouter.post('/',async (req,res)=>{
    
    const {body} =req;
    const {username,password} = body;

    const user= await User.findOne({username})
    const passwordCorrect = user===null?
    false:
    await bcrypt.compare(password,user.passwordHash)

    if(!(passwordCorrect&&passwordCorrect)){
        res.status(401).json({
            error:'invalid user or password'
        })

    }
    const userForToken={//esto es el payload
        id:user._id,
        username:user.username
    }
    const token=jwt.sign(userForToken,process.env.SECRET);//se forma el token o encripta


    res.send({
        name:user.name,
        username:user.username,
        token//se envia tambioan el token

    })
})

module.exports=loginRouter;