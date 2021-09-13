const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const profile = require('./Controllers/profile');
const signin = require('./Controllers/signin');
const image = require('./Controllers/image');

app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'postgres',
        database : 'smartfaceapp'
    }
});

app.get('/' , (req, res) => {
    res.json('Face Recognition API Running');
});

app.post('/signin', (req, res) => {
    signin.handleSignIn(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
    profile.handleProfile(req, res, db)
});

app.put("/image", (req, res) => {
    image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
    image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 8000, () => {
    console.log(`App Running on Port: ${process.env.PORT || 8000}`);
});