const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator'); // Импортируем функцию check из express validator для нашего логина и пароля

const authMiddleware = require('./middlewares/authMiddleware')
const roleMiddleware = require('./middlewares/roleMiddleware')

router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть не меньше 8 символов').isLength({min: 8}) // Создали валидацию для нашей регистрации
], controller.registration);
router.post('/login', controller.login);
router.get('/pizzas', controller.getPizzas)
router.get('/users', authMiddleware, controller.getUsers)

module.exports = router; // Обычный экспорт файла, тоже самое что export default