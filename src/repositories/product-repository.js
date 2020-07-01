const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = async () => {
    const result = await Product.find({
        active: true
    }, 'title price slug')
    return result
}

exports.getBySlug = async (slug) => {
    const result = await Product.findOne({
        slug: slug,
        active: true
    }, 'title description price slug tags')
    return result
}

exports.getById = async (id) => {
    const result = await Product
        .findById(id)
    return result
}

exports.getByTag = async (tag) => {
    const result = await Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags')
    return result
}

exports.create = async (data) => {
    var product = new Product(data)
    await product.save()
}

exports.update = async (id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        })
}

exports.delete = async (id) => {
    await Product
        .findOneAndRemove(id)
}