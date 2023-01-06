import express from 'express'
import cors from 'cors'
import { t } from 'tar'

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []

app.get("/",(req,res)=>{
    console.log("deu get")
    res.send("lallla")
})

app.get("/tweets",(req,res)=>{
    while (tweets.length >10){
        tweets.shift()
    }
    const tweetsAndAvatars = tweets.map(t=>{
        return {...t, avatar:users.find(t.username).avatar}
    })
    res.send(tweetsAndAvatars)
})

app.post("/sign-up",(req,res)=>{
    const data = req.body
    users.push(data)
    res.send("OK")
})

app.post("/tweets",(req,res)=>{
    const usersername = req.body.username
    if(users.find(u => u.username === username)){
        tweets.push(req.body.tweet)
        res.send("OK")
    }
})

app.listen(5000, ()=>console.log("Server on"))