const express = require('express')
const app = express();
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '@2Xuejingji3',
      database : 'smartbrain'
    }
  });

app.get('/', (req, res) => {
    res.send(database.users)
}) 

app.post('/signin', (req,res)=>{
    knex.select('email', 'hash').from('login').where('email', '=', req.body.email)
    .then(data => {
        // console.log(data[0])
       const isValid= bcrypt.compareSync(req.body.password, data[0].hash)
       if(isValid) {
           return knex.select('*').from('users').where('email', '=', req.body.email)
           .then(user => {
               res.json(user[0])
           })
           .catch(err=> res.status(400).json('unable to get user'))
       } else {
        res.status(400).json('wrong credential')
       }
    })
})

app.post('/register', (req,res)=>{
    const {email, name, password} = req.body;
    const hash = bcrypt.hashSync(password)
    knex.transaction(trx => {
        trx.insert({
            hash: hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
    // res.json(database.users[database.users.length-1])
})


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    knex.select('*').from('users').where({'id': id}).then((user) => {
        if(user.length) res.json(user[0])
        else res.status(400).json('not found')
    })
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    knex('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to count'))
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})

