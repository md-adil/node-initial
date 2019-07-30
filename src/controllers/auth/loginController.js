const User = require('../../models/User'),
    {ValidationError} = require('../../errors'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');

exports.login = async req => {
    const user = User.query().where('email', req.body.email).first();
    if (!user) {
        throw new ValidationError('Invalid credentials');
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
        throw new ValidationError('Invalid credentials');
    }
    const token = jwt.sign({ iat: (new Date()).getTime(), sub: user.id });
    return {
        token, user
    }
}
