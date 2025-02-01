require('dotenv').config(); // Нужен для работы dotenv
const mongoose = require('mongoose')
const express = require('express');

const app = express()

const cors = require('cors')
app.use(cors({
    origin: 'https://neetrunner.github.io/PIZZA/#/'
}))

const AuthRouter = require('./authRouter')

const PORT = process.env.PORT | 5000;
const bdUrl = process.env.MONGODB_URL;

app.use(express.json()) // Вызываем use чтобы он мог парсить json который придет в ответе
app.use('/auth', AuthRouter)

const start = async () => {
    try {
        await mongoose.connect(bdUrl)
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`)) // Используем метод listen из express для старта сервера
    } catch(e) {
        console.log(e)
    }
}

start();

/* Что такое CORS?
CORS — это механизм, который браузеры используют для ограничения запросов между различными доменами. Чтобы запрос был выполнен успешно, сервер должен явно указать, что он разрешает доступ к своему ресурсу из другого домена (в данном случае с http://localhost:5173). */