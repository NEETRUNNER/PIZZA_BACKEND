const { Schema, model } = require('mongoose');

const OrderSchema = new Schema ({
    name: {type: String, require: true},
    address: {type: String, require: true},
    phone: {type: String, require: true},
    pizzas: {type: Object, require: true},
    orderTime: {type: String, require: true}
})

module.exports = model('Order', OrderSchema);