import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// const users = []
// const tweets = []
import {users,tweets} from '../mock.js'

function getTweets(list = tweets,username=false){
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
    const size = tweets.length
    const limit = 10
    let tweetsAndAvatars=size>limit?tweets.slice(size-limit,size):[...tweets]
    tweetsAndAvatars = getTweets(tweetsAndAvatars)
    res.send(tweetsAndAvatars)
})

app.post("/sign-up", (req, res) => {
    const data = req.body
    if (!data.username || !data.avatar) return res.status(400).send("Todos os campos são obrigatórios")
    users.push(data)
    res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const data = req.body
    if (!data.username || !data.tweet) return res.status(400).send("Todos os campos são obrigatórios")
    const username = data.username
    if (users.find(u => u.username === username)) {
        tweets.push(req.body)
        res.status(201).send("OK")
    } else {
        res.status(401).send("UNAUTHORIZED")
    }
})

app.get("/tweets/:USERNAME",(req,res)=>{
    const username = req.params.USERNAME
    if (users.find(u => u.username === username)) {
        const tweetsByUser = getTweets(tweets,username)
        res.send(tweetsByUser)
    } else {
        res.sendStatus(400)
    }
})

app.listen(5000, () => console.log("Server on"))