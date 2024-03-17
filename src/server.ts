import express from "express"
import { Request, Response } from "express"
import start from "./index"
const app = express()

app.get("/", (request: Request, response: Response) => {
  response.send(start())
})

app.listen(3000, () => console.log("Listening on port 3000!"))
