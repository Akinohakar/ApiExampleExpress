require('dotenv').config();
const mongoose=require("mongoose");

const {MONGO_DB_URL,MONGO_DB_URL_TEST,NODE_ENV}=process.env;
const connectionString=NODE_ENV==='test'?MONGO_DB_URL_TEST:MONGO_DB_URL

//Conecion de mongodb
mongoose.connect(connectionString,{useNewUrlParser:true})
    .then(()=>{
        console.log("Base de datos connectada");
    })
    .catch((error)=>{
        console.log(error);
    })


//en caso de que todo estuviera en una sola linea
// //se va a crear un schema que es como un blueprint de como deben estar los datos 
// //es schema es como un contrato,es como en sql que haces tu tabla pero aqui es a nivel de aplicacion
// const noteSchema=new Schema({
//     content:String,
//     date:Date,
//     important:Boolean

// });

// //despues se crea un modelo

// const Note=mongoose.model('Note',noteSchema);//este es nuestro modelo para creae instancias

// const newNote=new Note({//haces la isntancia o nota
//     content:"Mongodb es la ostia tio",
//     date:new Date(),
//     important:true
// })

// newNote.save()//se guarda la nota  se pueden utilizar promesas
//         .then(result=>{
//             console.log(result);
//             mongoose.connection.close();
            
//         })
//         .catch(err=>{
//             console.log(err);

//         })

// //para encontrar algun documento igualmente se puede ocupar el modelo Note en si Note seria como la tabla

// Note.find({})
//         .then(result=>{
//             console.log(result);
//             mongoose.connection.close();
//         })



//para pertar la conexion en caso de que exista un problema:
process.on("uncaughtException",(error)=>{
   console.error(error);
   mongoose.disconnect();
})