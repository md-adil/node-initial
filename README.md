# Simple nodejs starter with express routing and objection model.

    git clone https://github.com/md-adil/node-starter my-project

###

    // getting started
    cd my-project
    yarn
    cp .env.example .env
    yarn start

##

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

### Database and Migrations

Migrate database

```bash
yarn migrate
```

Connect database through native client

```bash
yarn db:connect
```

Show all tables through native client

```bash
yarn db:tables
```

Explain table through native client

```bash
yarn db:explain users
```

Select from tables with or without limit through native client

```bash
yarn db:select users 100 # default 1000
```
