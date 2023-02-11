const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000

const app = express()
require('dotenv').config();
app.use(cors())
app.use(express.json())

app.get('/', async(req, res) =>{
    res.send('malco server is running')
})


mongoose.set('strictQuery', false);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ky0svg6.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('DB connected'))
.catch((err)=> console.log(err))



app.listen(port, ()=> console.log(`malco running on ${port}`))