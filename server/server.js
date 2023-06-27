require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const {SERVER_PORT} = process.env
const {seed} = require('./seed')


app.get('/', (req,resp) => {
    resp.status(200).sendFile(__dirname,'../public/index.html')
})

app.get('/profile', (req,resp)=>{
    resp.status(200).sendFile(__dirname,'../public/profile/profile.html')
})

const {
    getCampsites
} = require('./controller.js')

app.post('/seed', seed)

//MVP features 

app.get('/api/campsites', getCampsites)




app.listen(SERVER_PORT, console.log(`Gooood morning CAMPER! Server up on ${SERVER_PORT}`))