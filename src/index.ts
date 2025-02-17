import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config({path: "./.env"});
const app = express()
const port = 5000

app.use(express.json());
app.use(cors());

import { drizzle } from 'drizzle-orm/libsql';
import {createUser, deleteUser, getUser, getUsers, updateUser} from "./db/crud.js";


console.log(process.env.DB_FILE_NAME!)

const db = drizzle(process.env.DB_FILE_NAME!);

;

console.log(await getUsers(db));


app.get('/users', async (req, res) => {
    let users = await getUsers(db);
    res.send(users)
})
app.get('/users/:id', async (req, res) => {
    let user = await getUser(db, Number(req.params.id));
    res.send(user)
})

app.post('/users', async (req, res) => {
    console.log(req.body); 
    if (!req.body.name || !req.body.email) {
        return res.status(400).send("Missing required fields");
    }
    
    const Users = await createUser(db, req.body.name, req.body.email);
    
    res.send(Users);
});

//delete
app.delete('/users/:id', async (req, res) => {
    await deleteUser(db, Number(req.params.id));
    res.send("User deleted")
})
//update
app.put('/users/:id', async (req, res) => {
    await updateUser(db, Number(req.params.id), req.body.name, req.body.email);
    res.send("User updated")
})


app.listen(port, () => {
    console.log(`userdb app listening on port ${port}`)
})

