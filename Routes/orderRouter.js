const Router = require('express');
const pizzaRouter = new Router;

const controller = require('../Controllers/orderController')

pizzaRouter.post('/orderPizza', controller.addOrder)

module.exports = pizzaRouter;