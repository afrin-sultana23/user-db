import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config({ path: "./.env"});
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());


import { drizzle } from 'drizzle-orm/libsql';
import {createUser, deleteUser, getUser, getUsers, updateUser,getCourses,
    insertCart,getCart,deleteCart,updateCart
} from "./db/crud.js";


console.log(process.env.DB_FILE_NAME!)

const db = drizzle(process.env.DB_FILE_NAME!);

//console.log(await getUsers(db));
//console.log(await getCourses(db));
//console.log(await getCart(db,email));

app.get('/users', async (req, res) => {
    let users = await getUsers(db);
    res.send(users)
})
app.get('/courses', async (req, res) => {
    let courses = await getCourses(db);
    res.send(courses);
})

app.get("/cart/:email", async(req, res) => {
    const email = req.params.email;
    let cartItem = await getCart(db, email);
    res.send(cartItem);
})

app.post("/cart", async (req, res) => {
      const cartItem = req.body;
      cartItem.date = new Date().toISOString();
  
      const result = await insertCart(db, cartItem);
      res.send(result)
  });
  
  app.delete("/cart/:id", async (req, res) => {

    const id = Number(req.params.id);
    console.log("id=",id)
    const result = await deleteCart(db, id);
    if (result == 0) {
        return res.status(404).json({ success: false, message: 'Cart item not found' });
    }
    res.json({ success: true, message: 'Cart item deleted successfully' });
    
  });


app.get('/users/:id', async (req, res) => {
    let user = await getUser(db, Number(req.params.id));
    res.send(user)
})

app.post('/users', async (req, res) => {
    const { name, email, photoURL, phone, address } = req.body;
    const existingUser = await getUser( db, email );
    if (existingUser) {
        return res.status(409).send({ message: 'User already exists' });
    }
    const newUser = await createUser(db, name, email, phone, address);
    res.send(newUser);
})

//delete
app.delete('/users/:id', async (req, res) => {
    await deleteUser(db, Number(req.params.id));
    res.send("User deleted")
})
app.patch('/users/:id', async (req,res) => {
    const id = req.params.id;
    const result = await updateUser(db, id);
    res.send(result)
})

app.listen(port, () => {
    console.log(`userdb app listening on port ${port}`)
})

