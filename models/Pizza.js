const {Schema, model} = require('mongoose');

const PizzaSchema = new Schema ({
    pizza_img: {type: String, required: true},
    pizza_descr: {type: String, required: true},
    pizza_price: {type: Number, required: true},
    pizza_title: {type: String, required: true},
    pizza_weight: {type: String, required: true},
    id: {type: String, required: true},
    pizza_counter: {type: Number, required: true},
    amount: {type: Number, required: true},
    rating: {type: Number, required: true},
})

module.exports = model('Pizza', PizzaSchema);