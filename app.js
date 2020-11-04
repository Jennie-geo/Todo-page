const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash')
//initializing our session store and adding the express-seesion will get mysql store where data will be store
const MysqlStore = require('connect-session-sequelize')(session.Store)

const sequelize = require('./util/database');

const app = express();

//initialzing define where session will be store
let store;

app.set('view engine', 'ejs')
app.set('views', 'Views');

const db = require('./util/database');

const userRoutes = require('./routes/admin');
const loginRoutes = require('./routes/auth');
const Todo = require('./models/todo');
const User = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//initializing the session to be use and adding a resave: false will not be save on every req made but only when a change occur
app.use(session({
    secret: "adding secret to my session page", 
    resave: false, 
    saveUninitialized: false,
    schema: store,
    getStore: new MysqlStore({
        db: sequelize
    })
})) 
//calling flash as a function to desplay login error message 
app.use(flash())

app.use('/admin',userRoutes);
app.use(loginRoutes);


const PORT = process.env.PORT || 5000

Todo.belongsTo(User, { constraints: true, onDelete: 'CASCADE'}); // initializing my associations
User.hasMany(Todo)

sequelize
    //.sync({force: true})
     .sync()
    .then(result => {
         app.listen(PORT, () => console.log(`server running at ${PORT}`));
    }).catch(err => {
        console.log(err);
    });