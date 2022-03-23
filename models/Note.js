const {Schema,model} =require ("mongoose");
//se va a crear un schema que es como un blueprint de como deben estar los datos 
//es schema es como un contrato,es como en sql que haces tu tabla pero aqui es a nivel de aplicacion
const noteSchema=new Schema({
    content:String,
    date:Date,
    important:Boolean,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

});

//Como quiero cambiar algunas cosas y setearlas diferentes se hace los siguiente 
noteSchema.set('toJSON',{transform:(document,returnedObject)=>{
    returnedObject.id=returnedObject._id;//se trasforma el antiguo _id por id
    delete returnedObject._id;
    delete returnedObject.__v;
}})

//despues se crea un modelo

const Note=model('Note',noteSchema);//este es nuestro modelo para creae instancias

module.exports=Note;