const path = require('path')
const express = require('express')

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getAboutUs);

router.get('/contact-us', adminController.getContactUs);

router.get('/add-todo', adminController.getAddTodo); 

router.post('/add-todo', adminController.postAddTodo);

router.get('/todos', adminController.getTodos)

router.get('/edit-todo/:todoId', adminController.getEditTodo);

router.post('/edit-todo', adminController.postEditTodo);

router.get('/task-completed', adminController.getCompletedTodo)

router.patch('/task-completed', adminController.patchCompleted);

//router.post('/task-completed/:todoId', adminController.postMarkCompleted);

//router.post('/delete-product', adminController.postDeleteTodo);

module.exports = router;


