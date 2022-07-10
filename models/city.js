const mongoose = require ('mongoose')

const cityShema = new mongoose.Schema({
    country:{type:String, require:true},
    name:{type:String, require:true},
    image:{type:String, require:true},
    description: {type:String, required:true}
})
const City = mongoose.model('cities', cityShema)
module.exports = City