import express from 'express'
import cors from 'cors'
import { t } from 'tar'

const app = express()
app.use(cors())
app.use(express.json())

const users = [{
    username: "bobesponja",
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
}]
const tweets = [{
    username: "bobesponja",
    tweet: "eu amo o hub"
},
{
    username: "bobesponja",
    tweet: "eu odeio o hub"
}
]


app.get("/tweets", (req, res) => {
    while (tweets.length > 10) {
        tweets.shift()
    }
    const tweetsAndAvatars = tweets.map(t => {
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
        res.send("OK")
    }
})

app.listen(5000, () => console.log("Server on"))