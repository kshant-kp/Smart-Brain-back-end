const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const port = process.env.PORT || 3000;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL ,
      ssl: {
        rejectUnauthorized: false
      }    
    }
  });


const app=express();


app.use(bodyParser.json());
app.use(cors());

app.get('/',(_req,res)=>{
    res.send('this is working');
})

app.post('/signin', (req,res) => { signin.handleSignin(req,res,db,bcrypt) })
app.post('/register',(req,res) => { register.handleRegister(req,res,db,bcrypt) })          
app.get('/profile/:id',(req,res) => { profile.handleProfileGet(req,res,db) })         
app.put('/image', (req , res) => { image.handleImage(req,res,db) })
app.post('/imageurl', (req , res) => { image.handleApiCall(req,res) })
           

app.listen(port,()=>{
    console.log(`this is running on port ${port}`);
})
      



// / --> res = this is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/:userId --> GET = user
// /image --> PUT --> user