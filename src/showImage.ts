import { Router, Request, Response } from 'express'
import path from 'path'
import router_creat from './creatImage'


const router_show : Router = Router()

router_show.use(router_creat);


router_show.use('/api',async (req: Request, res: Response) => {
  let ex = req.query.ex as string
  let wd = req.query.width as string
  let hg = req.query.height as string
  let im = req.query.imageName as string
  let pth = path.join(__dirname, `/images/newfold/${im}-${wd}-${hg}.${ex}`) as string

     await  res.status(200).sendFile(pth)
})


export default router_show as Router
