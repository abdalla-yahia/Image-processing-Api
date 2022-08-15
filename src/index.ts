import express, { Application, Request, Response } from 'express'
import path from 'path'
import router_creat from './creatImage'
import router_show from './showImage'
import router_Cr_Ot_Folder from './CreatOutFold'
import router_app from './app'
import { Router } from 'express';


// Create an app Application
type app = Application
const app: app = express()

//Define the port to default 5000 or clint chooses
const port: string | number = process.env.PORT || 5000

// Create a listening server
app.listen(port, () :void => {
  console.log(`Server Listenning at port ${port} ...`)
})

// Creat A middleware
app.use(express.static('./')) as object
app.use(express.urlencoded({ extended: true })) as object

// add routing for root path
export const Root: object = app.get('/', (req: Request, res: Response) :void => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Using the Custom middlewares
app.use(router_Cr_Ot_Folder) as Router
app.use(router_app) as Router
app.use(router_show) as Router
app.use(router_creat) as Router

//the /api endpoint
app.get('/api', (req :Request, res:Response) :void=> {
  res.status(200).send('Image Not Found')
})

export default app
