// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World! Test");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);

app.get("/users", (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    const job = req.query.job;

    let result = users["users_list"];
    
    if (name != undefined) {
        console.log(`Looking for name: ${name}`);
        result = result.filter((user) => user["name"] === name);
    }
    if (id != undefined) {
        console.log(`Looking for id: ${id}`);
        result = result.filter((user) => user["id"] === id);
    }
    if (job != undefined) {
        console.log(`Looking for job: ${job}`);
        result = result.filter((user) => user["job"] === job);
    }


    if (result.length == 0) res.status(404);
    else res.status(200);

    res.send({user_list: result});
});



app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

const addUser = (user) => {
    let check = users["users_list"].find(u => user["id"] === u["id"]);
    console.log(check);
    if (check == undefined)
    {
        users["users_list"].push(user);
        return true;
    }
    
    return false;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    
    if (!addUser(userToAdd)) {
        res.status(400);
        res.send();
    }
    else {
        res.status(201);
        res.send(userToAdd);
    }
});

const deleteUserById = (id) => {
    users["users_list"] = users["users_list"].filter(
        (user) => user["id"] !== id
    );
};

app.delete("/users/:id", (req, res) => {
    const idToDelete = req.params.id;
    deleteUserById(idToDelete);

    res.status(204);
    res.send();
});

