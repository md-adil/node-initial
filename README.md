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
