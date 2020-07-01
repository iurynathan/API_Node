const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

exports.create = async (data) => {
    var customer = new Customer(data)
    await customer.save()
}

exports.authenticate = async (data) => {
    const result = await Customer.findOne({
        email: data.email,
        password: data.password
    })
    return result
}

exports.getById = async (id) => {
    const result = await Customer.findById(id)
    return result
}