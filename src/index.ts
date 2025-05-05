import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config({ path: "./.env"});
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());


import { drizzle } from 'drizzle-orm/libsql';
import {createUser, deleteUser, getUsers, updateUser,getCourses,
    insertCart,getCart,deleteCart,
    getUserByEmail,
} from "./db/crud.js";


console.log(process.env.DB_FILE_NAME!)

const db = drizzle(process.env.DB_FILE_NAME!);

console.log(await getUsers(db));
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

app.post('/users', async (req, res) => {
    const { name, email, phone, address } = req.body;
    const newUser = await createUser(db, name, email, phone, address);
    console.log(newUser)
    res.send(newUser);
})

// Example in Express.js or similar
app.get('/users/:email', async (req, res) => {
    const email = req.params.email;
    console.log("Checking admin for:", email);

    const user = await getUserByEmail(db, email);
    console.log(user)
    res.send({ isAdmin: user?.isAdmin === 1 });
});


//delete
app.delete("/users/:id", async (req, res) => {

    const id = Number(req.params.id);
    const result = await deleteUser(db, id);
    res.json({ success: true, result });
    
  });

app.patch('/users/:id', async (req,res) => {
    const id = parseInt(req.params.id);
    const result = await updateUser(db, id);
    res.json({ success: true, result })
})

// app.patch("/courses/:id", async (req, res) => {
//     const { id } = req.params;
//     const { price } = req.body;
//     console.log(price)
//     const result = await editCourse(db, parseInt(id), parseFloat(price))
//     res.json({ success: true, result });
   
//         console.log(result);
      
    
// });


app.listen(port, () => {
    console.log(`userdb app listening on port ${port}`)
})

