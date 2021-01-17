const express = require('express')
const app = express();
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgresken',
      password : 'kenpg',
      database : 'smartbrain'
    }
  });

app.get('/', (req, res) => {
    res.send(database.users)
}) 

app.post('/signin', (req,res) => { signin.handleSignin(req, res, knex, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req,res,knex,bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req , res, knex)})

app.put('/image', (req, res) => { image.handleImage(req, res, knex)})
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})

