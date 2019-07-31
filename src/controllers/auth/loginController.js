const User = require('../../models/User'),
    { ValidationError } = require('../../errors'),
    config = require('../../config/app'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

exports.login = async req => {
    if (!req.body.email || !req.body.password) {
        throw new ValidationError('Email and password is required')
    }
    const user = await User.query().where('email', req.body.email).first();
    if (!user) {
        throw new ValidationError('Invalid credentials');
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
        throw new ValidationError('Invalid credentials');
    }
    const token = jwt.sign({ iat: (new Date()).getTime(), sub: user.id }, config.key);
    return {
        token, user
    }
}
