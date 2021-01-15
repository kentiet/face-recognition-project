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
      password : 'kenpg',
      database : 'smartbrain'
    }
  });

knex.select('*').from('users').then(data => console.log(data))

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'hello',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
}) 

app.post('/signin', (req,res)=>{
    // Load hash from your password DB.
    // bcrypt.compare("test", '$2a$10$tr9ruUdqaeGtjDNikWgaou/tyvTyR5vH5f.DjUC2jhOjOq1Z5Lea.', function(err, res) {
    //     // res == true
    //     console.log(res)
    // });
    // bcrypt.compare("veggies", '$2a$10$tr9ruUdqaeGtjDNikWgaou/tyvTyR5vH5f.DjUC2jhOjOq1Z5Lea.', function(err, res) {
    //     // res = false
    //     console.log('wrong', res)
    // });
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0])
    } else {
        res.status(400).json('error ')
    }
})

app.post('/register', (req,res)=>{
    const {email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash)
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id == id){
            found = true;
            return res.json(user);
        }
    })
    if(!found) res.status(404).json('no such user')
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id)
        {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found) res.status(404).json('no such user')
})


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('app is running on port 3000')
})

