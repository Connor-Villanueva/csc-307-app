// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import db from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World! Test");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


app.get("/users", (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    const job = req.query.job;
    
    db.getUsers(name, job)
        .then((result) => {
            res.send({users_list: result});
        })
        .catch((error) => console.log(error));
        
});


app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = db.findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});


app.post("/users", (req, res) => {
    const userToAdd = req.body;

    db.addUser(userToAdd)
        .then((user) => {
            res.status(201).send(user); // addUser throws error if invalid
        }).catch((error) => {
            console.log(error);
            res.status(400).send();
        });
});


app.delete("/users/:id", (req, res) => {
    console.log(req.params.id);
    db.deleteUser(req.params.id)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send()
        });

});

