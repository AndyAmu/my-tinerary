const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/User')

module.exports = passport.use(new jwtStrategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.SECRET_KEY
}, (jwt_payload, done) => {

    User.findOne({ _id: jwt_payload.userData.id })
        .then(userData => {
            // console.log(userData)
            if (userData) {

                return done(null, userData)
            }
            else if (err) {

                return done(err, false);
            }
            else {
                return done(null, false)
            }
        })
        .catch(err => {
            console.log(err.status)
            return done(err, false)
        })

}))