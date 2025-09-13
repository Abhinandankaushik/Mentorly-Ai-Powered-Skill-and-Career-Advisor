import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router  from "./routes/youtubeRouter.js"
dotenv.config();

const PORT = process.env.PORT;
const app = express()

app.use(express.json())
// app.use(express.urlencoded())
app.use(cors({
    origin : "*"
}))

app.use('/api/v1/',router);

app.listen(PORT,()=>console.log(`app is runnig on : localhost:${PORT}`))