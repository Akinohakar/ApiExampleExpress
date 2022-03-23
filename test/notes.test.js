// const mongoose=require('mongoose');
// const supertest=require('supertest');
// const {app,server}=require('../index');
// const Note=require("../models/Note")
// const {initialNotes}=require('./helper')
// const api=supertest(app);


// //este un hook que se hace antes de cada test
// beforeEach(async()=>{
//     await Note.deleteMany({})

//     const note1=new Note(initialNotes[0])
//     await note1.save();
//     const note2=new Note(initialNotes[1])
//     await note2.save();

// })
// test('notes are returned in json',async ()=>{//los test son asinccronos hay que poner eso
//     await api
//     .get('/api/notes')
//     .expect(200)
//     .expect('Content-Type',/application\/json/)
// })
// test('there are notes',async ()=>{//los test son asinccronos hay que poner eso
//     const response=await api.get('/api/notes')
//     expect(response.body).toHaveLength(initialNotes.length)
// })
// test('there are a note about ninudev',async ()=>{//los test son asinccronos hay que poner eso
//     const response=await api.get('/api/notes')
//     expect(response.body[0].content).toBe('Aprendiendo con ninudev');
// })

// test('a valid note has been created',async ()=>{//asin es para que seea asincrona la funcion y el await es para que te devualva una promise
//     const newNote={
//         content:'Proximanmente ser xd',
//         important:true
//     }

//     await api//se envia una solicitud post
//     .post('/api/notes')
//     .send(newNote)
//     .expect(200)
//     .expect('Content-Type',/application\/json/)

//     const response =await api.get("/api/notes")//se hace un reqauest para ver las notas que sse han subido y se checa si llego esa nota
//     const contents=response.body.map(note=>note.content)
//     expect(contents).toContain(newNote.content)//se checa si una de las notas obtenidas concuerda conla nota creada 

// })

// test('a invalid note without content has been created',async ()=>{//asin es para que seea asincrona la funcion y el await es para que te devualva una promise
//     const newNote={
       
//         important:true
//     }

//     await api//se envia una solicitud post
//     .post('/api/notes')
//     .send(newNote)
//     .expect(400)
    

//     const response =await api.get("/api/notes")//se hace un reqauest para ver las notas que sse han subido y se checa si llego esa nota
//     expect(response.body).toHaveLength(initialNotes.length)//verificar que efectivamente no se haga creado una nota 

// })


// afterAll(()=>{//es un hook que se va a ejecutar cuando se terminan los test 
//     mongoose.connection.close()
//     server.close()
// })