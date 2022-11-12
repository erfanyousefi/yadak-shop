const createHttpError = require('http-errors')

const checkAdmin = (req, res, next) => {
    try {
        const role = req.user.role
        if (role === 'ADMIN') return next()
        throw createHttpError.Forbidden('access denied')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkAdmin
}