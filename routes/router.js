const express = require('express');
const router = express.Router();
const db = require('../config/database.js');
const bcrypt = require('bcrypt');
const passport = require('passport')

router.get('/', (req, res) => {
    res.render('homepage.hbs', {
        title: "Homepage | Gallery"
    })
})

router.get('/login', (req, res) => {
    res.render('login.hbs', {
        title: "Login | Gallery"
    })
})

router.get('/profile', (req, res) => {
    res.render('profile.hbs', {
        title: "My profile | Gallery"
    })
})

router.get('/upload', (req, res) => {
    res.render('upload.hbs', {
        title: "Upload Image | Gallery"
    })
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.post('/login', (req, res) => {


    // console.log(req.body)
    db.con.query("SELECT * FROM users", (err, result, row) => {
        if (!err) {
            // const myPlaintextPassword = 'stefchoeadmin123'
            // bcrypt.hash(myPlaintextPassword, 10, function (err, hash) {
            //     // Store hash in your password DB.
            //     // example output, taking your hash
            //     // hash = $2a$10$fKAyjaG0pCkisZfRpKsBxursD6QigXQpm1TaPBDZ4KhIZRguYPKHe
            //     console.log(hash)
            // });

            bcrypt.compare(req.body.password, result[0].password, (err, res) => {
                console.log(res)
                if (res) {
                    console.log("Logged in!");
                    req.session.username = result[0].username;
                    console.log(req.session.username);
                } else {
                    console.log("Passwords don't match")
                }
            });

        } else {
            // db error
            console.log(err)
        }
    })

})

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// route middleware to make sure a user is logged in
let isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}




module.exports = router;