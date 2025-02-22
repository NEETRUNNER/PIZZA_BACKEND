const Router = require('express');
const pizzaRouter = new Router;

const controller = require('../Controllers/pizzaController')

pizzaRouter.post('/addPizza', controller.addPizza)
pizzaRouter.get('/getPizzaList', controller.getPizzaList)
pizzaRouter.get('/getPaginatePizza', controller.getPaginatePizza)

pizzaRouter.get('/getPages', controller.getPages)

pizzaRouter.get('/sortByPrice', controller.sortByPrice)
pizzaRouter.get('/sortByCategory', controller.sortByCategory)

module.exports = pizzaRouter;