const Router = require('express').Router();

const {getCities, getOneCity, addCity, modifyCity,multiplesCities, removeCity} = require('../controllers/citiesControllers');

const {getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, multiplesItinerary, getItinerariesByCity, likeDislike} = require('../controllers/itineraryControllers')

const {signInUser,singUpUsers, signOut,verifyEmail,verificationToken} = require('../controllers/userControllers')

const validator = require('../config/validator')

const passport = require('../config/passport')

const{getActivities,addActivity,removeActivity,modifyActivity,getOneActivity,multiplesActivities,getActivitiesByitinerary} = require('../controllers/activitiesControllers');

const {addComment, modifyComment, deleteComment}= require('../controllers/commentsControllers')
// Cities
Router.route('/cities')
.get(getCities)
.post(addCity)

Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)

Router.route("/multiplesCities")
.post(multiplesCities)

// Itineraries
Router.route('/itinery')
.get(getItineraries)
.post(addItinerary)

Router.route('/itinerary/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

Router.route("/multiplesItinerary")
.post(multiplesItinerary)

Router.route("/ItinerariesByCity/:id")
.get(getItinerariesByCity)

// Likes
Router.route("/like/:id")
.put(passport.authenticate("jwt", {session: false}),likeDislike)

//SingIn SingUp + validator + verificacion de usuario
Router.route('/auth/signUp')
.post(validator, singUpUsers)

Router.route('/auth/signIn')
.post(signInUser)

Router.route('/verify/:uniqueString')
.get(verifyEmail)

//singUot
Router.route('/auth/signOut')
.post(signOut)


//Token
Router.route('/auth/loginToken')
.get(passport.authenticate('jwt',{ session: false }),verificationToken) // Recibe dos parametros, primero el tipo de token JWT y las opciones session: false, en false porque no voy a ejecutar una sesión activa sinouna autenticación, si esta todo ok llamara a nuestro controlador verificarToke


//Activities
Router.route('/activities')
.get(getActivities)
.post(addActivity)

Router.route('/activities/:id')
.delete(removeActivity)
.put(modifyActivity)
.get(getOneActivity)

Router.route('/multiplesActivities')
.post(multiplesActivities)

Router.route('/activitiesbyitinerary/:id')
.get(getActivitiesByitinerary)


//Comment
Router.route('/itineraries/comment')
.post(passport.authenticate('jwt',{ session: false }),addComment)


Router.route('/itineraries/comment/:id')
.put(passport.authenticate('jwt',{ session: false }),modifyComment)
.post(passport.authenticate('jwt',{ session: false }),deleteComment)

module.exports = Router