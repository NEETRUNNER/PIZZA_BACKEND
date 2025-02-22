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
    
    async getPaginatePizza(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;  // Текущая страница (по умолчанию 1)
            const limit = parseInt(req.query.limit) || 8; // Количество элементов (по умолчанию 5)
            const skip = (page - 1) * limit; // Пропустить N элементов

            console.log(`Запрос: page=${page}, limit=${limit}, skip=${skip}`);
    
            // Запрашиваем данные с учетом пагинации
            const pizzas = await Pizza.find().skip(skip).limit(limit);
            const total = await Pizza.countDocuments(); // Всего записей в базе
    
            res.json({
                total, // Общее количество элементов
                page,  // Текущая страница
                limit, // Количество на странице
                pages: Math.ceil(total / limit), // Всего страниц
                pizzas, // Данные
            });
        } catch (error) {
            res.status(400).json({ error: 'Ошибка сервера' });
        }
    }

    async sortByCategory(req, res) {
        try {
            const page = parseInt(req.query.page);  // Текущая страница (по умолчанию 1)
            const limit = parseInt(req.query.limit); // Количество элементов (по умолчанию 5)
            const skip = (page - 1) * limit; // Пропустить N элементов

            let filter = {};
            
            const {category} = req.query;

            if (category && category !== 'undefined') {
                filter.category = { $in: category.split(",") } /* $in предоставляет эффективный способ запроса документов на основе нескольких потенциальных значений для определенного поля в одном запросе. */
                console.log('Категория:', category)
            }

            console.log(req.query)

            // Запрашиваем данные с учетом пагинации
            const pizzas = await Pizza.find(filter).skip(skip).limit(limit);
            const total = await Pizza.countDocuments(filter); // Всего записей в базе + если убираем filter то ломается количество страниц для обычных фильтров

            console.log(total)
            console.log(limit)
            console.log(filter)
            console.log(req.query)

            res.json({
                total, // Общее количество элементов
                page,  // Текущая страница
                limit, // Количество на странице
                pages: Math.ceil(total / limit), // Всего страниц
                pizzas, // Данные
            });
        } catch (error) {
            console.error("Ошибка при получении пицц:", error);
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }

    async sortByPrice(req, res) {
        try {
            const page = parseInt(req.query.page);  // Текущая страница (по умолчанию 1)
            const limit = parseInt(req.query.limit); // Количество элементов (по умолчанию 5)
            const skip = (page - 1) * limit; // Пропустить N элементов

            let sortOptions = {};
            
            const {sortBy, sortOrder} = req.query;

            console.log(req.query)

            if (sortBy && sortOrder && sortBy !== "undefined" && sortOrder !== "undefined") {
                sortOptions[sortBy] = sortOrder === "expensive" ? -1 : 1; 
            }

            // Запрашиваем данные с учетом пагинации
            const pizzas = await Pizza.find().sort(sortOptions).skip(skip).limit(limit);
            const total = await Pizza.countDocuments(); // Всего записей в базе + если убираем filter то ломается количество страниц для обычных фильтров

            console.log(total)

            res.json({
                total, // Общее количество элементов
                page,  // Текущая страница
                limit, // Количество на странице
                pages: Math.ceil(total / limit), // Всего страниц
                pizzas, // Данные
            });
        } catch (error) {
            console.error("Ошибка при получении пицц:", error);
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }

    async getPages(req, res) {
        try {
            const page = parseInt(req.query.page);  // Текущая страница (по умолчанию 1)
            const limit = parseInt(req.query.limit); // Количество элементов (по умолчанию 5)
            const skip = (page - 1) * limit; // Пропустить N элементов

            let filter = {};
            let sortOptions = {};
            
            const {category, sortBy, sortOrder} = req.query;

            if (category && category !== 'undefined') {
                filter.category = { $in: category.split(",") } /* $in предоставляет эффективный способ запроса документов на основе нескольких потенциальных значений для определенного поля в одном запросе. */
                console.log('Категория:', category)
            }

            console.log(req.query)

            if (sortBy && sortOrder && sortBy !== "undefined" && sortOrder !== "undefined") {
                sortOptions[sortBy] = sortOrder === "expensive" ? -1 : 1; 
            }

            // Запрашиваем данные с учетом пагинации
            const pizzas = await Pizza.find(filter).sort(sortOptions).skip(skip).limit(limit);
            const total = await Pizza.countDocuments(filter); // Всего записей в базе + если убираем filter то ломается количество страниц для обычных фильтров

            console.log(total)
            console.log(filter)

            res.json({
                total, // Общее количество элементов
                page,  // Текущая страница
                limit, // Количество на странице
                pages: Math.ceil(total / limit), // Всего страниц
                pizzas, // Данные
            });
        } catch (error) {
            console.error("Ошибка при получении пицц:", error);
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }

    async getRecomendationPizzas(req, res) {
        try {
            const RecomendationPizzas = await Pizza.aggregate([{$sample: {size: 4}}]); // Создали рандомную выборку для рекоммендованных пицц
            res.json(RecomendationPizzas)
        } catch(error) {
            console.log(error);
            res.status(500).json({error: "Ошибка получения рекомендаций"})
        }
    }
}

module.exports = new PizzaController;