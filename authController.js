const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs'); // npm пакет для хеширования пароля
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const {secret} = require('./secretKey')

const generateAccesToken = (id, roles) => { // Генерируем токен с помощью функции
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'}) // Функция sign генерирует токен на основе переданных данных, и с помощью expiresIn он удалиться в течении 24 часов, чтобы его опять создать придется опять зарегистрироваться, чтобы он был действителен 24 часа и так по кругу
}

class AuthController {
    async registration (req, res) { 
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty) { // Проверка, если ошибки не пустые
                return res.status(400).json({message: 'Ошибка при регистрации', errors}) // Так мы возвращаем на сервер ошибку и с помошью метода json создаём сообщение
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});

            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }

            const hashPassword = bcrypt.hashSync(password, 7); // Это делается для того чтобы пароль хранился в базе данных уже захешированным
            
            const userRole = await Role.findOne({value: 'User'})
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return res.json({message: 'Пользователь был успешно зарегистрирован'})

        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'});   
        }
    }

    async login (req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username}) // С помощью метода findOne ищем совпадения в базе данных, где username критерий поиска
            if (!user) {
                return res.status(400).json('Такой пользователь не найден')
            }
            const validPassword = bcrypt.compareSync(password, user.password) // Метод compareSync нужен для сравнения обычного пароля и захешированого

            if (!validPassword) {
                return res.status(400).json('Введен не правильный пароль')
            }

            const token = generateAccesToken(user._id, user.roles);
            return res.json({token})
        } catch {
            console.log(e)
            res.status(400).json({message: 'Login error'});   
        }
    }

    async getPizzas (req, res) {
        try {
            res.status(200).json({message: 'Чё'})
        } catch {

        }
    }

    async getUsers (req, res) {
        try {
            const users = await User.find(); // Метод find или findOne ищет пользователя или всех пользователей
            res.json(users)
        } catch(e) {
            console.log('Получение пользователей', e)
        }
    }
}

module.exports = new AuthController;

/* const userRole = new Role();
const adminRole = new Role({value: 'Admin'})

await userRole.save(); // Так мы сохраняем это в базу данных
await adminRole.save(); // Так мы сохраняем это в базу данных */