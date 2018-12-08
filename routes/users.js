var express = require('express'),
    router = express.Router(),
    userController = require('../controllers/users');


    router.route('/')
        .get(userController.indexUser)
        .post(userController.storeUser);

    router.route('/:id')
        .get(userController.getUser);

    router.route('/:id/edit')
        .get(userController.editUser)
        .post(userController.updateUser);

    router.route('/:id/delete')
        .get(userController.deleteUser);


module.exports = router