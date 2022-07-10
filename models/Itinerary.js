const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    profilePic: { type: String, required: true },
    profilename: { type: String, required: true },
    likes: { type: Array },
    hours: { type: String, required: true },
    price: { type: String, required: true },
    hashtag: { type: Array, default: [] },
    activities: { type: String, required: true },
    cityId: { type: mongoose.Schema.ObjectId, ref: 'cities' },
    activitiesId: [{ type: mongoose.Types.ObjectId, ref: 'activities' }],
    comments: [{
        comment: { type: String },
        userId: { type: mongoose.Types.ObjectId, ref: 'users' }
    }]
})
const Itinerary = mongoose.model('itineraries', itinerarySchema)
module.exports = Itinerary