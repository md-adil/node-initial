# Simple nodejs starter with express routing and objection model.

    git clone https://github.com/md-adil/node-starter my-project

```bash
cd my-project
yarn
cp .env.example .env
# change .env file update database name & config
yarn migrate
yarn start
```

### We have already written some codes for you

#### Login
```js
// src/controllers/auth/loginController.js

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

```
#### Resister

```js
// src/controllers/auth/registerController.js

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

```
#### Fetching users
```js
// src/routes/api.js

const controller = require("../controllers");
const userController = controller("userController");

router.get("/users", userController.index);
```

```js
// src/controllers/userController.js

const { ResponseError } = require("../errors");
const User = require("../models/User");

exports.index = async req => {
    if (!req.query.page) {
        throw new ResponseError(
            "Page is required" /** response error message */,
            422 /** Response error code */
        );
    }
    return User.query().page(req.query.page, 25);
};
```
