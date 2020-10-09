const Todo = require('../models/todo');

exports.getContactUs = (req, res, next) => {
  res.render('contact-us', {
    pageTitle: "Contact Us",
    path: "/admin/contact-us",
  });
};

exports.getAboutUs = (req, res, next) => {
  res.render('about', {
    pageTitle: "About Us",
    path: "/admin/",
  })
};

exports.getAddTodo = (req, res, next) => {
  res.render('edit-todo', {
    pageTitle: 'Add Todo',
    path: '/admin/add-todo',
    editing: false

  })

};
exports.postAddTodo = (req, res, next) => {
  const dailyTask = req.body.title;
  const status = req.body.status;
  const priority = req.body.priority;
  const dueTime = req.body.duetime;
  const description = req.body.description;
  const myTodo = new Todo({
    title: dailyTask,
    status: status,
    priority: priority,
    duetime: dueTime,
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
      todo: todo
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
  const updatedDuetime = req.body.duetime;
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

//marking all incomplete tasks as complete
exports.patchCompleted = (req, res) => {
  const todoId = req.params.todoId;
  Todo.findByPk(todoId).then(task => {
    task.status = true
//retrieving a status of the id and change it to true then save the data  
  return task.save()
})
  .then(result => {
    console.log("status updated");
    res.redirect('/about')
  })
  .catch(err => {console.log(err)
  })

}

   exports.getCompletedTodo = (req, res, next) => {
     const todoId = req.body.todoId;
      Todo.findByPk(todoId).then(task => {
        if(!task) {
          res.redirect('/about')
        }
      
        })
         res.render("completed-todo", {
          pageTitle: 'Completed Task',
          items: task,
          path: 'admin/task-completed'
        }).then(result => {
          console.log('Todo Completed')
          return res.redirect('/admin/task-completed')
        }).catch(err => {
          console.log(err)
        }).catch(err => console.log(err))
   }

  //  exports.postDeleteTodo = (req, res, next) => {
  //   const todoId = req.body.todoId;
  //   Todo.find({ where: {id = todoId}}).then(todo => {
  //     return todo.destroy()
  //   }).then(todo => {
  //     console.log('TODO DELETED');
  //     res.redirect('/admin/todos');
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }
