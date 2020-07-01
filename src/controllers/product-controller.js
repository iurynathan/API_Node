const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')
const guid = require('guid')

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        var data = repository.getBySlug(req.params.slug)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        const data = repository.getByTag(req.params.tag)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 2, 'O título deve conter pelo menos 2 caracteres')
    contract.hasMinLen(req.body.description, 2, 'A descrição deve conter pelo menos 10 caracteres')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        // let filename = guid.raw().toString() + 'jpg'
        // let rawdata = req.body.image
        // let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        // let type = matches[1]
        // let buffer = new Buffer(matches[2], 'base64')
        // function errorImage(error) {
        //     if (error) {
        //         filename = 'default-product.png'
        //     }
        // }
        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: req.body.image
        })
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Produto deletado com sucesso!'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}