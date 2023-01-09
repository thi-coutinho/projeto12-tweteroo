import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []
// import {users,tweets} from '../mock.js'

function getAvatars(list = tweets,username=false){
    let outList
    if (!username) {
        outList = list.map(t => {
            const avatar = users.find(u=>t.username===u.username).avatar
        return { ...t, avatar }
        })
    } else {
        const avatar = users.find(u=>username===u.username).avatar
        outList = list.filter(l=>l.username===username).map(l=>{
            return {...l,avatar}
        })
    }
    return outList

}
app.get("/tweets", (req, res) => {
    const page = req.query.page? Number(req.query.page): 1
    if (!(page>=1)) return res.status(400).send("Informe uma página válida!") 
    const size = tweets.length
    const limit = 10
    const end = size - (page-1)*limit > 0 ? size - (page-1)*limit : 0
    const start = end > limit? end-limit: 0
    let tweetsAndAvatars=size>limit || page > 1 ? tweets.slice(start,end):[...tweets]
    tweetsAndAvatars = getAvatars(tweetsAndAvatars)
    res.send(tweetsAndAvatars.reverse())
})

app.post("/sign-up", (req, res) => {
    const data = req.body
    if (!data.username || !data.avatar ||  typeof data.username !== 'string' || typeof data.avatar!=='string' ){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    users.push(data)
    res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const data = {username:req.headers.user,tweet:req.body.tweet}
    if (!data.username || !data.tweet) return res.status(400).send("Todos os campos são obrigatórios!")
    const username = data.username
    if (users.find(u => u.username === username)) {
        tweets.push(data)
        res.status(201).send("OK")
    } else {
        res.status(401).send("UNAUTHORIZED")
    }
})

app.get("/tweets/:USERNAME",(req,res)=>{
    const username = req.params.USERNAME
    if (users.find(u => u.username === username)) {
        const tweetsByUser = getAvatars(tweets,username)
        res.send(tweetsByUser)
    } else {
        res.sendStatus(400)
    }
})

app.listen(5000, () => console.log("Server on"))