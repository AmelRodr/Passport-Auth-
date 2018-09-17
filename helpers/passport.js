const passport				 = require('passport');
const User						 = require('../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;

//LOCAL STRATEGY
passport.use(User.createStrategy());

//FACEBOOK STRATEGY
passport.use(new FacebookStrategy({
  clientID: "252677848656567",
  clientSecret: "6c1612b07641e2b74628948153e7b495",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, (accessToken, refreshToken, profile, cb) => {
  console.log(profile)
  User.create({ username: profile.displayName }, function (err, user) {
    if (err) { return cb(err) }
    cb(null, user)
  })
}
))

//SERIALIZE USER
passport.serializeUser(function(user,cb){
  cb(null, user)
});

//DESERIALIZE USER
passport.deserializeUser(function(user,cb){
  cb(null, user)
})

module.exports = passport;
