const Router = require('express');
const pizzaRouter = new Router;

const controller = require('../Controllers/pizzaController')

pizzaRouter.post('/addPizza', controller.addPizza)
pizzaRouter.get('/getPizzaList', controller.getPizzaList)

module.exports = pizzaRouter;