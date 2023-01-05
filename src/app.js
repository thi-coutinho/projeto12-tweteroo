import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

app.get("/",(req,res)=>{
    console.log("deu get")
    res.send("lalalla")
})

app.listen(5000, ()=>console.log("Server on"))