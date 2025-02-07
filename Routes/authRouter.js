const Router = require('express');
const authRouter = new Router();
const controller = require('../Controllers/authController');
const { check } = require('express-validator'); // Импортируем функцию check из express validator для нашего логина и пароля

const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

authRouter.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть не меньше 8 символов').isLength({min: 8}) // Создали валидацию для нашей регистрации
], controller.registration);
authRouter.post('/login', controller.login);
authRouter.get('/users', authMiddleware, controller.getUsers)

module.exports = authRouter; // Обычный экспорт файла, тоже самое что export default