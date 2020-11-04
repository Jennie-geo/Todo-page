const Todo = require('../models/todo');

const User = require('../models/user');

exports.getContactUs = (req, res, next) => {
  res.render('contact-us', {
    pageTitle: "Contact Us",
    path: "/admin/contact-us",
    isAuthenticated: req.session.isLoggedIn
  });
};

 exports.getAboutUs = (req, res, next) => {
   res.render('about', {
     pageTitle: "About Us",
     path: "/admin/",
     isAuthenticated: req.session.isLoggedIn
  })
 };

exports.getAddTodo = (req, res, next) => {

  res.render('edit-todo', {
    pageTitle: 'Add Todo',
    path: '/admin/add-todo',
    editing: false,
    isAuthenticated: req.session.isLoggedIn

  })

};
exports.postAddTodo = (req, res, next) => {
  const dailyTask = req.body.title;
  const status = req.body.status;
  const priority = req.body.priority;
  const startTime = req.body.startTime;
  const description = req.body.description;
  const myTodo = new Todo({
    title: dailyTask,
    status: status,
    priority: priority,
    duetime: startTime,
    description: description
  });
  myTodo.save({ completed: false })
    .then(result => {
      console.log('Created Todo')
      return res.redirect('/admin/todos')
    }).catch(err => {
      console.log(err)
    })
};


exports.getTodos = (req, res, next) => {
  Todo.findAll().then(todos => {
    res.render('todos', {
      prods: todos,
      pageTitle: "All Todos",
      path: "/admin/todos",
      isAuthenticated: req.session.isLoggedIn
    });
  })
    .catch(err => {
      console.log(err)
    });
};

exports.getEditTodo = (req, res, next) => {
  const editMode = req.query.edit; //seting the edit query params, if in edit mode
  if (!editMode) { //if it's not in edit mode
    return res.redirect('/');
  }
  const todoId = req.params.todoId;//get the todo id
  Todo.findByPk(todoId).then(todo => {
    if (!todo) {
      return res.redirect('/')
    }
    res.render('edit-todo', {
      pageTitle: 'Edit Todo',
      path: '/edit-todo',
      editing: editMode, //if it's in edit mode
      todo: todo,
      isAuthenticated: req.session.isLoggedIn
    })
  }).catch(err => {
    console.log(err)
  })

};

exports.postEditTodo = (req, res, next) => {
  const todoId = req.body.todoId;   //retrieving all the datas i need
  const updatedDailyTask = req.body.title;
  const updatedStatus = req.body.status;
  const updatedPriority = req.body.priority;
  const updatedDuetime = req.body.startTime;
  const updatedDesc = req.body.description;
  Todo.findByPk(todoId).then(todo => {
    todo.title = updatedDailyTask;
    todo.status = updatedStatus;
    todo.priority = updatedPriority;
    todo.duetime = updatedDuetime;
    todo.description = updatedDesc;

    return todo.save()
  }).then(todo => {
    console.log('UPDATED SUCCESSFUL')
    res.redirect('/admin/todos')
  })
    .catch(err => {
      console.log(err)
    });

}

// marking all incomplete tasks as complete
exports.patchCompleted = (req, res, next) => {
  // const todoId = req.body.todoId;
  // const changeStatus = req.body.status
  // Todo.findByPk(todoId).getTodos().then(todos => {
  //   console.log(todos)
  //   todos.status = changeStatus
  //   //return req.todos.status = true;
  //       todos.status.save({ status:true});
  // })
  // .then(result => {
  //   return req.Todos.clearTodos();
  // })
  // .then(()=> {
  //     res.redirect('/admin/completed')
  //   })
  // .catch(err => {
  //   console.log(err)
  // })
}

  exports.getCompleted = (req, res, next) => {
    Todo.findAll({where: {status: true}}).then(todos => {
      res.render("completed-todo", {
        pageTitle: 'Completed Task',
        path: '/admin/completed-todo',
        items: todos,
        isAuthenticated: req.session.isLoggedIn
      })
    }).catch(err => {
      console.log(err)
    })
     
       }

   exports.postDeleteTodo = (req, res, next) => {
    const todoId = req.body.todoId;
    Todo.findByPk(todoId).then(todos => {
      return todos.destroy()
    }).then(result => {
      console.log('TODO DELETED');
      res.redirect('/admin/completed-todo');
    })
    .catch(err => {
      console.log(err)
    })
  }

