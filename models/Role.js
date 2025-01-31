const { Schema, model } = require("mongoose");

const Role = new Schema ({ // Создаём схему-сущность какими должны быть данные пользователя
    value: {type: String, unique: true, default: 'User'}
})

module.exports = model('Role', Role);