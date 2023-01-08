import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []


app.get("/tweets", (req, res) => {
    const size = tweets.length
    const limit = 10
    let tweetsAndAvatars=size>limit?tweets.slice(size-limit,size):[...tweets]
    tweetsAndAvatars = tweetsAndAvatars.map(t => {
        const avatar = users.find(u=>t.username===u.username).avatar
        return { ...t, avatar }
    })
    res.send(tweetsAndAvatars)
})

app.post("/sign-up", (req, res) => {
    const data = req.body
    users.push(data)
    res.send("OK")
})

app.post("/tweets", (req, res) => {
    const username = req.body.username
    if (users.find(u => u.username === username)) {
        tweets.push(req.body)
        res.status(201).send("OK")
    } else {
        res.status(401).send("UNAUTHORIZED")
    }
})

app.listen(5000, () => console.log("Server on"))