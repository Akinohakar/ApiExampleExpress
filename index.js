//me quede en crea usuarios
require('./mongo');//cuando se escribe el require asi nadamas ejecuta una vez lo que esta dentro del archivo js
var cors = require('cors');

const express = require("express");
const handleErrors = require('./middleware/handleErrors');
const notFound = require('./middleware/notFound');

const jwt=require('jsonwebtoken');
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const app = express();
const userRouter=require("./controllers/users");
const loginRouter=require("./controllers/login")

app.use('/images',express.static('img'))//para servir archivos estaticos ,se pone en el parametro como se va llamar la carpeta estatica
//el primer parametro /images es para decidir ua ruta donde se resulve el middleware

app.use(express.json());//middle es es un cosa que intercepota una peticion y le hace algUNA COSA
//El app.use es que calquier peticion pase por el use y va de arriba hacia abajo para seguir con la siguiente cosa utilizas un calback next(),ejemplo de app.use hasta abajo
app.use(cors())//conrs esta abierto para cualquier localhost
Sentry.init({
    dsn: "https://af4e10c42f18427eb3da784edcce319d@o1171830.ingest.sentry.io/6266760",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

//sentry test
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());
//end sentry test
const Note = require("./models/Note");
const User = require('./models/User');
const { response } = require('express');

app.get("/", function (req, res) {
    res.send('<h1>Hola tinaco</h1>'); //automaticamente el send detecta que el content type es html
})

app.get("/api/notes", function (req, res) {
    Note.find({}).populate('user',{username:1,name:1}).then(notesjson=>{
        
        res.json(notesjson);
    })
   

})
app.get("/api/notes/:id", function (req, res,next) {
    const id = req.params.id; //se recupera el segmento dinamico del url
    Note.findById(id).then(note=>{
        if (note) {
            res.json(note);
        } else {
            res.status(404).end();
        }
    }).catch(error=>{
        next(error);
    })

    //si se encuentra alguna nota
  


})


app.delete("/api/notes/:id", function (request, response) {
    const {id}=request.params;
    Note.findByIdAndDelete(id).then(res=>{
        response.status(204).end();
    }).catch(error=>next(error))
   
})

app.put("/api/notes/:id", function (request, response) {
    

    const {id}=request.params;
    const note=request.body;

    const aNote={
        content:note.content,
        important:note.important
    }
    Note.findByIdAndUpdate(id,aNote,{new:true}).then(result=>{//Esto en respuesta te devuelve lo que ha encontrado,para que te devuelva el valor cambiando se ponde el 3 parametero
        response.json(result);
    })

})
//asi llega la cabezera de autenticacion:
//Bearer token

app.post("/api/notes",cors(), async function  (req, res) { //para las post necesitas un body parser anterirormente se utilizaba el module externo se vio asi en el bootcamp de udemy pero ya viene incluida en express
    const {content,important=false} = req.body //para parsear el post y obtener el cuerpo donde viene la informacion
    const authorization=req.get('authorization');//para recurarar el header de auterizacion
    let token=null;
    if(authorization&&authorization.toLocaleLowerCase().startsWith('bearer')){
        token=authorization.substring(7);//obtener el token,este empieza desde el substring 7

    }

    const decodedToken=jwt.verify(token,process.env.SECRET);//SE DECODIFICA EL TOKEN 
    if(!token ||!decodedToken.id){
        return response.status(401).json({error:'ell token no esta prro'});
    }

    const {id:userId}=decodedToken;
    const user=await User.findById(userId)
    if(!content){//en caso de que no exista contenido en el post
        return res.status(400).json({
            error:"uhhhhh"
        })
    }
    const nnote=new Note({//se hace la instacia del objeto 
        content:content,
        date:new Date(),
        important:important,
        user:user._id

    })

//    nnote.save().then(savednote=>{//se guarda la nota y en caso de que la promise se cumpla se manda de respuesta al post la nota 
//        res.json(savednote);
//    })
    
    try{
        const savedNote=await nnote.save()//se guarda la nota
        user.notes=user.notes.concat(savedNote._id);//la nota tambien se almacena en el usuario
        await user.save()//se guardan los cambios 
        res.json(savedNote);
    }catch(err){
        
    }
  
})

app.use('/api/users',userRouter);
app.use('/api/login',loginRouter);


app.use(notFound);
app.use(Sentry.Handlers.errorHandler());//error handler
app.use(handleErrors);



const PORT= process.env.PORT || 3001 ;//USAR el puerto adecuado
const server=app.listen(PORT, function () {
    console.log(`Andamos escuchando ${3001}`);
})


//se hace heroku create
//para deployear en heroku primero se suben los cambios a github con push y depues se suben a heroku con git push heroku main

module.exports={app,server}