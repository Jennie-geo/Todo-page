const path = require('path')
const express = require('express')

const adminController = require('../controllers/admin');

const isAuth = require('../public/isAuthenticated/is-auth')

const router = express.Router();

router.get('/', adminController.getAboutUs);

router.get('/contact-us', adminController.getContactUs);

 router.get('/add-todo',isAuth, adminController.getAddTodo); 

 router.post('/add-todo', isAuth, adminController.postAddTodo);

router.get('/todos', isAuth, adminController.getTodos)

router.get('/edit-todo/:todoId', isAuth, adminController.getEditTodo);

router.post('/edit-todo', isAuth, adminController.postEditTodo);

router.get('/completed-todo', isAuth, adminController.getCompleted)

router.patch('/completed-todo/:todoId', isAuth, adminController.patchCompleted);

router.post('/delete-todo', isAuth, adminController.postDeleteTodo);

module.exports = router;


