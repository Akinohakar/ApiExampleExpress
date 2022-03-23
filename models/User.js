const uniqueValidator=require("mongoose-unique-validator");
const {Schema,model} =require ("mongoose");
//se va a crear un schema que es como un blueprint de como deben estar los datos 
//es schema es como un contrato,es como en sql que haces tu tabla pero aqui es a nivel de aplicacion
const userSchema=new Schema({
    username:{
        type:String,
        unique:true
    },
    name:String,
    passwordHash:String,
    notes:[{
        type:Schema.Types.ObjectId,//para que se relacione
        ref:'Note'//la referencia del modelo
    }]

});


userSchema.set('toJSON',{transform:(document,returnedObject)=>{//es para cuando se regrese 
    returnedObject.id=returnedObject._id;//se trasforma el antiguo _id por id
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
}})

userSchema.plugin(uniqueValidator);

const User=model('User',userSchema);//hacemos el modelo 
module.exports=User;