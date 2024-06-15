const express = require('express');
const app = express();

const bodyParser = require('body-parser');


app.use(bodyParser.json());

let tasks = [];
let nextId = 1;

app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});

// POST /create - Add task
app.post("/create", (req, res) => {
    try {
        const { name, age, city, marks } = req.body;
        if (!name || !age || !city || !marks) {
            return res.status(400).send({ message: "All fields are required" });
        }
        const newTask = { id: nextId++, name, age, city, marks };
        tasks.push(newTask);
        res.status(201).send(newTask);
    } catch (err) {
        console.log(err);
    }
});

// GET /list - Get all tasks
app.get("/list", (req, res) => {
    try {
        res.send(tasks);
    } catch (error) {
        console.log(error);
    }
});

// GET /student/:id - Get specific task by ID
app.get("/student/:id", (req, res) => {
    try {
        const task = tasks.find(t => t.id === parseInt(req.params.id));
        if (task) {
            res.send(task);
        } else {
            res.status(404).send({ message: "Task not found" });
        }
    } catch (err) {
        res.status(404).send({ message: "Task not found" });
    }
});

// DELETE /delete/:id - Delete task
app.delete("/delete/:id", (req, res) => {
    try {
        const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            res.send("deleted");
        } else {
            res.status(404).send({ message: "Task not found" });
        }
    } catch (err) {
        res.status(404).send({ message: "Task not found" });
    }
});

// PUT /student/:id - Update task
app.put("/student/:id", (req, res) => {
    try {
        const { name, age, city, marks } = req.body;
        if (!name || !age || !city || !marks) {
            return res.status(400).send({ message: "All fields are required" });
        }
        const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
        if (taskIndex !== -1) {
            tasks[taskIndex] = { id: parseInt(req.params.id), name, age, city, marks };
            res.send(tasks[taskIndex]);
        } else {
            res.status(404).send({ message: "Task not found" });
        }
    } catch (err) {
        res.status(404).send({ message: "Task not found" });
    }
});

// GET /student - Search tasks by name
app.get("/student", (req, res) => {
    try {
        const nameQuery = req.query.name;
        const filteredTasks = tasks.filter(t => new RegExp(nameQuery, 'i').test(t.name));
        res.json(filteredTasks);
    } catch (err) {
        res.status(404).send({ message: "Task not found" });
    }
});

app.listen(3030, () => {
    console.log("Server is running at port 3030");
});



