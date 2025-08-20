import express from "express"
import bodyParser from "body-parser";
const app = express()


import { server_router } from "./routes/server.routes.js"
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", server_router)

export {app}