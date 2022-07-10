const mongoose = require ('mongoose')

const usersShema = new mongoose.Schema({
    nameUser:{type:String, require:true},
    lastNameUser:{type:String, require:true},
    photoUser:{type:String, require:true},
    email: {type:String, required:true},
    country: {type:Array, required:true},
    from : {type:Array},
    password: {type:Array, required:true},
    uniqueString: {type:String, required:true}, // Clave unica aleatoria 
    emailVerified: {type: Boolean, required: true} //
})
const Users = mongoose.model('users', usersShema)
module.exports = Users