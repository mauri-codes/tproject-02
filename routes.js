var express = require("express");
var User = require("./models/user");
var Link = require("./models/link");
var Process = require("./models/process");
var router = express.Router();
var passport = require("passport");
router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    console.log("here");
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});
router.get("/", function(req, res, next) {
    User.find()
        .sort({ createdAt: "descending" })
        .exec(function(err, users) {
            if (err) { return next(err); }
            res.render("index", { users: users});
        });
});
router.get("/signup", function(req, res) {
    res.render("signup");
});
router.post("/signup", function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username }, function(err, user) {
        if (err) { return next(err); }
        if (user) {
            req.flash("error", "User already exists");
            return res.redirect("/signup");
        }
        var newUser = new User({
            username: username,
            password: password,
            role: 4
        });
        newUser.save(next);
    });
}, passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect: "/login",
    failureFlash: true
}));
router.get("/users/:username", function(req, res, next) {
    User.findOne({ username: req.params.username }, function(err, user) {
        if (err) { return next(err); }
        if (!user) { return next(404); }
        res.render("profile", { user: user });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});
router.post("/login", passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect: "/login",
    failureFlash: true
}));
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        next();
    } else {
        req.flash("info", "You must be logged in to see this page. ");
        res.redirect("/login");
    }
}
router.get("/edit", ensureAuthenticated, function (req, res) {
    res.render("edit");
});
router.post("/edit", ensureAuthenticated, function (req, res, next) {
    req.user.displayName = req.body.displayName;
    req.user.bio = req.body.bio;
    req.user.save(function (err) {
        if(err){
            next(err);
            return;
        }
        req.flash("info", "Profile updated!");
        res.redirect("/edit");
    });
});

router.post("/delete",function (req, res) {
    var data = req.body;
    User.remove({"username": data.name}, function (err) {
        if(err) console.log(err);
    });
    res.sendStatus(200);
});

router.post("/setlink", function (req, res) {
    var data = req.body;
    console.log("data.name: " + data.name);
    var newLink = new Link({
        linkID: data.id,
        username: data.name,
        status: data.status,
        processName: data.process,
        date: Date.now()
    });
    newLink.save(function(err,resp) {
        if(err) {
            console.log(err);
            res.send({
                message :'something went wrong'
            });
        }
    });
    res.json({"hi": "world"});
    // res.sendStatus(200);

});

router.get("/FingerprintRequest", function (req, res) {

});

module.exports = router;