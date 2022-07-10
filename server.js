require('dotenv').config()

const express = require ('express')
const Router = require ('./routes/routes')
const cors = require('cors')

const passport = require("passport")
const PORT = 4000
const app = express()


require('./config/database')

//middlewares
app.use(passport.initialize()) // Inicio passport
app.use(cors())
app.use(express.json())
app.use('/api', Router)

app.set('port',PORT)
app.get('/',(req,res)=>{
    res.send('SERVIDOR CREADO')
})


app.listen(PORT, () => {console.log('Server ready on PORT: ' + app.get('port'))
})