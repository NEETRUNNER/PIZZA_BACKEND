const Pizza = require('../models/Pizza');

class PizzaController {
    async addPizza (req, res) {
        try {
            const newPizza = new Pizza(req.body)
            await newPizza.save();
            return res.json(newPizza)
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Ошибка добавления пиццы'})
        }
    }

    async getPizzaList (req, res) {
        try {
            const pizzaList = await Pizza.find();
            res.json(pizzaList);
        } catch(e) {
            console.log('Ошибка получения пиццы', e)
            res.status(400).json({message: 'Ошибка получения списка пицц'})
        }
    }
}

module.exports = new PizzaController;