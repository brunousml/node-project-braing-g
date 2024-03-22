import express from "express"
import { router } from "./routes"
import { setupSwagger } from "./swagger"

const app = express()

require("./database") // enable sequelize to server

app.use(express.json())
app.use(router)

// Setup Swagger
setupSwagger(app);

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

process.on("SIGINT", () => {
  server.close()
  console.log("Server stopped")
})
