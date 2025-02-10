require('dotenv').config(); // Нужен для работы dotenv
const mongoose = require('mongoose')
const express = require('express');

const app = express()

const cors = require('cors')
app.use(cors({
    origin: '*'
}))

const AuthRouter = require('./Routes/authRouter');
const PizzaRouter = require('./Routes/pizzaRouter')
const OrderRouter = require('./Routes/orderRouter')

const PORT = process.env.PORT | 5000;
const bdUrl = process.env.MONGODB_URL;

app.use(express.json()) // Вызываем use чтобы он мог парсить json который придет в ответе

app.use('/auth', AuthRouter);
app.use('/pizza', PizzaRouter)
app.use('/order', OrderRouter)

const start = async () => {
    try {
        await mongoose.connect(bdUrl)
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`)) // Используем метод listen из express для старта сервера
    } catch(e) {
        console.log(e)
    }
}

start();