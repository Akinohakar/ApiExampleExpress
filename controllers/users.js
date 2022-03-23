const userRouter=require('express').Router()//es para usar routeo afuera del index
const bcrypt=require('bcrypt');

const User=require('../models/User');
//las rutas son relativas a lo que se uso de middleware

userRouter.get('/',async(req,res)=>{
    const users=await User.find({}).populate('notes',{content:1,date:1});//es segundo parametro indica que propiedades se queiren del populate//populate es para referenciar a la otra coleccion
    res.json(users)//ya no ncecesitamos convestirlo a json porque es res.json lo hace automaticamente 

})

userRouter.post('/', async (req,res)=>{
    
    try{
        const{body}=req;
        const {username,name,password}=body;
        const saltRounds=10;
        const passwordHash=await bcrypt.hash(password,saltRounds)
        const user=new User({
            username,
            name,
            passwordHash:passwordHash
    
        })
    
        const savedUser=await user.save();
        res.status(201).json(savedUser);
    }catch(error){
        res.status(400).json(error)

    }
   
})

module.exports=userRouter;