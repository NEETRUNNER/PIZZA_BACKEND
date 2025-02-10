const Order = require('../models/Order')

class orderController {
    async addOrder(req, res) {
        try {
            const newOrder = new Order(req.body);
            await newOrder.save();
            return res.json(newOrder)
        } catch(e) {
            console.log(e);
            res.status(400).json({message: 'Ошибка добавления заказа'})
        }
    }
}

module.exports = new orderController;