const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'Views');

const db = require('./util/database');
const userController = require('./controllers/user');
const userRoutes = require('./routes/user-routes');
const userModel = require('./models/user-model');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//initializing the session to be use

app.use(userRoutes);
app.use(userModel);
app.use(userController)

const PORT = process.env.PORT || 5000

sequelize
    //.sync({force: true})
     .sync()
    .then(result => {
        return User.findByPk(1)
            // console.log(result);
            .then(user => {
                if (!user) {
                  return  User.create({ name: 'Jenny', email: 'jenny@gmail.com' })
                }
                return user;
            })
            .then(user => {
                return user.createComplete();//creating complete from the datatbase model
            })
            .then(complete => {
                app.listen(PORT, () => console.log(`server running at ${PORT}`));
            })
    }).catch(err => {
        console.log(err);
    });