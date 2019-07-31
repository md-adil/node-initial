const User = require('../../models/User'),
    {ValidationError} = require('../../errors'),
    config = require('../../config/app'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken')

exports.register = async req => {
    if (await User.query().where('email', req.body.email).select('id').first()) {
        throw new ValidationError("It seems someone has already take this email address.");
    }
    const user = await User.query().insert({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    });
    const token = jwt.sign({iat: (new Date).getTime(), sub: user.id}, config.key);
    return {
        token, user
    }
};
