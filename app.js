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
// cors для всех источников
app.use(cors());
// парсер для json
app.use(express.json());
//метод для поиска индекса юзера по id
const getUserIndexFromId = (userId) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            return i;
        }
    }
    return -1;
};
//методя для проверки данных при добавлении/изменении юзера
//этот метод можно унифицировать путем передачи проверяемых полей в аргумент метода
const checkBody = (body) => {
    const fields = ["login", "email", "country", "sex", "age"];
    return fields.every(field => field in body);
};
//запрос всех пользователей
app.get("/users", (req, res) => {
    res.send(users);
});
//удаление пользователя по id
app.delete("/user", (req, res) => {
    const userId = +req.query.userId;
    //находим индекс юзера
    const index = getUserIndexFromId(userId);
    if (index === -1) {
        return res.sendStatus(404);
    }
    users.splice(index, 1);
    res.send(users);
});
//добавление нового пользователя
app.post("/user", (req, res) => {
    //проверяем тело запроса на его наличие и наличие в нем нужных нам полей
    if (!req.body || !checkBody(req.body)) { 
        return res.sendStatus(400);
    }
    const user = req.body;
    user.id = users[users.length - 1].id + 1;
    users.push(user);
    res.send(users);
});
//получение данных пользователя по id
app.get("/user", (req, res) => {
    const userId = +req.query.userId;
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.sendStatus(404);
    } 
    res.send(user);
});
//изменение данных пользователя по id
app.put("/user", (req, res) => {
    //проверяем тело запроса на его наличие и наличие в нем нужных нам полей
    if (!req.body || !checkBody(req.body)) { 
        return res.sendStatus(400);
    }
    const userId = +req.query.userId;
    //находим индекс юзера
    const index = getUserIndexFromId(userId);
    if (index === -1) {
        return res.sendStatus(404);
    }
    const editedUser = req.body;
    editedUser.id = userId;
    users.splice(index, 1, editedUser);
    res.send(users);
});

app.listen(5000, () => console.log("сервер запущен"));