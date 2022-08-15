import express, { Application, Request, Response } from 'express'
import path from 'path'
import router_creat from './creatImage'
import router_show from './showImage'

// Create an app Application
type app = Application
const app: app = express()

//Define the port to default 5000 or clint chooses
const port: string | number = process.env.PORT || 5000

// Create a listening server
app.listen(port, () => {
  console.log(`Server Listenning at port ${port} ...`)
})

// Creat A middleware
app.use(express.static('./'))
app.use(express.urlencoded({ extended: true }))

// add routing for root path
export let Root: object = app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Using the  middlewares
app.use(router_show)
app.use(router_creat)

//the /api endpoint
app.get('/api', (req, res) => {
  res.status(200).send('Image Not Found')
})

export default app
