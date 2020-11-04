const bcrypt = require('bcryptjs') //bcrypting the password
const crypto = require('crypto') //nodejs inbuilt library for resetting of password

const User = require('../models/user')

exports.getLogin = (req, res, next) => {
    const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1];
    //setting a condition of getting the error message
    let message = req.flash('error')

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
     res.render('auth/login',{
    path:'/login',
    pageTitle: 'Login Page',
    isAuthenticated: false,
    errorMessage: message

})
}

exports.getSignup = (req, res, nex) => {
    let message = req.flash('error')

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Sign-Up Page',
        isAuthenticated: false,
        errorMessage: message
})
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({where: {email: email}}).then(user => {
        if (!user) {//retrieving user from the database
            req.flash('error', 'Invalid email or password') //error key and message value
            return res.redirect('/login')
        }
        bcrypt.compare(password, user.password).then(passwordDoMatch => {
        if (passwordDoMatch) {
            req.session.isLoggedIn = true
            req.session.user = user // passing the database user here
           return req.session.save(err => {
                console.log(err);
                res.redirect('/admin/add-todo');
            });
        }
        req.flash('error', 'Invalid email or password')
        res.redirect('/login');
        }).catch(err => {
         console.log(err)
         res.redirect('/login')
        })
    })
  
    }

exports.postSignup = (req, res, next) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmpassword
    //validate the above
    User.findOne({ where: {email: email} }).then(userExists => {
        if (userExists) {
            req.flash('error', 'E-mail exists already.')
            return res.redirect('/signup');
        }
       return bcrypt.hash(password, 12)
       .then(hashedPassword => {
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            todo: { tasks: [] }       
    
        });
        return user.save();
    })
    .then(result => {
        res.redirect('/login');
    });
    }).catch(err => {
        console.log(err);
    })
}

exports.postLogout = (req, res) => {
    req.session.destroy((err)=> {
        console.log(err)
        res.redirect('/admin')
    })
}

exports.getReset = (req, res, next) => {
    let message = req.flash('error')

    if (message.length > 0) {
        message = message[0]
    } else {
        message = null
    }
    res.render('auth/resetPasswd', {
        path: '/resetpasswd',
        pageTitle: 'Reset Password',
        isAuthenticated: false,
        errorMessage: message
})
}

exports.postReset = (req, res, next) => {
crypto.randomBytes(32, (err, buffer) => {
    if (err) {
        console.log(err)
        return res.redirect('/resetPasswd')
    }
    const token = buffer.toString('hex')
    User.findOne({where: {email: req.body.email}})
    //if there is no user in the database with the email
    .then(user => {
        if (!user) {
            req.flash('error', 'No User found with this email')
        return res.redirect('/resetPasswd')
        }
     // if there is a user with the email
     user.resetToken = token;
     user.resetTokenExpiration = Date.now + 1800000;
     return user.save();
    }).then(result => {
        res.redirect('/login');
        transporter.sendMail({
            to: req.body.email,
            from: 'isintumejenny@gmail.com',
            subject: 'Reset Password',
            html: `
            <p> You request a reset password</p>
            <p> Click this <a href='http://localhost:3000/reset/${token}'>link</a> to set a new password.</p>`
        })
    })
    .catch(err => {
        console.log(err)
    })
})
}