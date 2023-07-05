const express = require("express");
const cors = require("cors");

let users = [
    {
        id: 1,
        login: "Rail",
        email: "ceppou-3457@yopmail.com",
        country: "Canada",
        sex: "male",
        age: 18
    },
    {
        id: 2,
        login: "Zelic",
        email: "coxetesa-7949@yopmail.com",
        country: "Russia",
        sex: "male",
        age: 45
    },
    {
        id: 3,
        login: "Rimondac",
        email: "afoiyi-3803@yopmail.com",
        country: "Abkhazia",
        sex: "female",
        age: 60
    },
    {
        id: 4,
        login: "Uyetterf",
        email: "fennoi-2444@yopmail.com",
        country: "Albania",
        sex: "male",
        age: 31
    },
    {
        id: 5,
        login: "Dishaw",
        email: "ronnihezodu-9902@yopmail.com",
        country: "",
        sex: "female",
        age: 27
    },
    {
        id: 6,
        login: "Kitann",
        email: "igaprouti-5657@yopmail.com",
        country: "",
        sex: "male",
        age: 0
    },
    {
        id: 7,
        login: "Yolath",
        email: "macreifru-3476@yopmail.com",
        country: "Brazil ",
        sex: "",
        age: 0
    },
    {
        id: 8,
        login: "Clividor",
        email: "zatacesigo-9298@yopmail.com",
        country: "Bolivia ",
        sex: "male",
        age: 58
    },
    {
        id: 9,
        login: "Satierr",
        email: "outrucroucei-4737@yopmail.com",
        country: "Belgium ",
        sex: "female",
        age: 47
    },
    {
        id: 10,
        login: "Hiaral",
        email: "teleikussauvu-1594@yopmail.com",
        country: "Belarus ",
        sex: "female",
        age: 36
    }
];


const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
    res.send(users);
});

app.delete("/user", (req, res) => {
    const userId = +req.query.userId;
    users = users.filter(user => user.id !== userId);
    res.send(users);
});

app.post("/user", (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const user = req.body;
    user.id = users[users.length - 1].id + 1;
    users.push(user);
    res.send(users);
});

app.get("/user", (req, res) => {
    const userId = +req.query.userId;
    const user = users.find(user => user.id === userId);
    if (!user) return res.sendStatus(400);
    res.send(user);
});

app.put("/user", (req, res) => {
    const userId = +req.query.userId;
    const editedUser = req.body;
    editedUser.id = userId;
    users = users.map(user => user.id === userId ? editedUser : user);
    res.send(users);
});


app.listen(5000, () => console.log("сервер запущен"));