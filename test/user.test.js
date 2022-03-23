const supertest=require('supertest');
const {app,server}=require('../index');
const api=supertest(app);
const bcrypt =require('bcrypt');
const User=require("../models/User");
describe.only('creating a new user ',()=>{
    beforeEach(async()=>{
        await User.deleteMany({});
        
        const passwordHash=await bcrypt.hash('paswd',10);
        const user =new User({username:"Alan",passwordHash})
        await user.save()

    })

    test("works as expacted when we create a new user",async ()=>{
        const usersDB=await User.find({});
        const userAtStart=usersDB.map(user=>user.toJSON());
        const newUser={
            username:"minutina",
            name:"Alass",
            password:"fddfsdf"
        }

        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type',/application\/json/)//se envia a la api
        const usersEnd=await User.find({});
        const userAtEnd=usersEnd.map(user=>user.toJSON());
        expect(userAtEnd).toHaveLength(userAtStart.length+1);
        
    })

    test("cratin fails with proper statuscode and message if username is alredy taken",async ()=>{
        const usersDB=await User.find({});
        const userAtStart=usersDB.map(user=>user.toJSON());
        const user =new User({username:"Alan",name:'Alan',passwordHash:'midutinac'})


        const result=await api
            .post("/api/users")
            .send(user)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        //la respeusta nos debe dar un error
       
        const usersEnd=await User.find({});
        const userAtEnd=usersEnd.map(user=>user.toJSON());
        expect(userAtEnd).toHaveLength(userAtStart.length);

    })
})