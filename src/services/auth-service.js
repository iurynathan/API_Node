const jwt = require('jsonwebtoken')

// Método 'generateToken' gerá o token com a 'data' inputando os dados dentro do método.
exports.generateToken = async (data) => {
    // Retornando o token com a 'data' e a criptografia com o tempo de expiração de 1 dia.
    return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' })
}
// Método 'decodeToken' recebe o token criando uma variável 'data' dentro da função.
exports.decodeToken = async (token) => {
    // Variável 'data' que verifíca se o token está correto. Retornando a variável 'data'.
    var data = await jwt.verify(token, process.env.SALT_KEY)
    return data
}
// Função 'authorize' serve como interceptador para bloquear as rotas que não tenham autorização.
exports.authorize = function (req, res, next) {
    // Variável 'token' verifica se em alguma desas requisições tem algum 'token'.
    var token = req.body.token || req.query.token || req.headers['x-access-token']
    // Verifica se existe um 'token' na requisição.
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        })
    // Se existir um 'token' nessa área ele verifica se o 'token' está correto.
    } else {
        jwt.verify(token, process.env.SALT_KEY, function(error, decoded){
            if(error) {
                res.status(401).json({
                    message: 'Token Inválido'
                })
            // Caso o token seja válido da vazão a requisição.
            } else {
                next()
            }
        })
    }
}

exports.isAdmin = function (req, res, next) {
    // Variável 'token' verifica se em alguma desas requisições tem algum 'token'.
    var token = req.body.token || req.query.token || req.headers['x-access-token']
    // Verifica se existe um 'token' na requisição.
    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        })
    // Se existir um 'token' nessa área ele verifica se o 'token' está correto.
    } else {
        jwt.verify(token, process.env.SALT_KEY, function(error, decoded){
            if(error) {
                res.status(401).json({
                    message: 'Token Inválido'
                })
            // Caso o token seja válido da vazão a requisição.
            } else {
                if (decoded.roles.includes('admin')) {
                    next()
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    })
                }
            }
        })
    }
}