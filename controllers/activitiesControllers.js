const Activity = require('../models/activity')


const activitiesControllers={
    getActivities: async (req, res) => { //funcion asincrona que creara un trabajo
        let activities //definimos las variables
        let error = null // definimos el error, que en primer instancia sera nulo
        try { //utilizamos el constructor de modelos
            activities = await Activity.find() // esperamos esa creacion y el metodo .FIND encuentra
        } catch (err) { error = err } // cachamos el error en caso de tener uno 
        res.json({
            response: error ? 'ERROR' : { activities }, //respuestas segun lo que suceda
            success: error ? false : true,
            error: error
        })
    },
    getOneActivity: async (req, res) => {
        const id = req.params.id
        let activity 
        let error = null
        try {
            activity = await Activity.findOne({ _id: id }) 
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : { activity },
            success: error ? false : true,
            error: error
        })
    }
    ,
    addActivity: async (req, res) => {
        const {name, image, itinerary } = req.body.data
        let activity
        let error = null
        try {
            activity = await new Activity({
                name:name,
                image: image,
                itinerary: itinerary
            }).save()
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },
    
    modifyActivity: async (req, res) => {
        const id = req.params.id
        const activity = req.body
        let activitydb
        let error = null
        try {
            activitydb = await Activity.findOneAndUpdate( //el metodo .findeOneAndUpdate requiere tres parametros
                { _id: id }, //el parametro necesario para el modelo que tiene que encontrar
                activity,// la modificacion que vamos a pasar en body
                { new: true }) //y esta opcion en true que "cambia" el modelo viejo por el actualizado (en caso de false: crea un modelo nuevo con la modificacion)
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : activitydb,
            success: error ? false : true,
            error: error
        })
    },

    removeActivity: async (req, res) => {
        const id = req.params.id
        let activity
        let error = null
        try {
            activity = await Activity.findOneAndDelete({ _id: id })// el metodo .findOneAndDelete encuentra y elimina
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },

    multiplesActivities: async (req, res) => {
        let activity = []
        const data = req.body.data //almaceno en la constante data la informacion que le pedi al body.
        let error = null
        try {
            data.map(async (item) => {
                await new Activity({
                    name: item.name,
                    image: item.image,
                    itinerary: item.itinerary,
                }).save()
            })
        } catch (err) { error = err }
        activity = await Activity.find()
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },

    getActivitiesByitinerary: async (req,res) => {
        const id = req.params.id
        let activities
        let error = null
        try {
            activities = await Activity.find({ cityId : id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : activities,
            success: error ? false : true,
            error: error
        })
    }
}

module.exports = activitiesControllers