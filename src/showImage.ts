import { Router, Request, Response } from 'express'
import path from 'path'
import router_creat from './creatImage'


const router_show : Router = Router()

router_show.use(router_creat) as Router;


router_show.use('/api',async (req: Request, res: Response) :Promise<void>=> {
const ex = req.query.ex as string
const wd = req.query.width as unknown as number
const hg = req.query.height as unknown as number
const im = req.query.imageName as string
const pth = path.join(__dirname, `../src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`) as string

     await  res.sendFile(pth)
})


export default router_show as Router;
