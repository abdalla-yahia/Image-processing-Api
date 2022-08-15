import { Router, Request, Response } from 'express'
import path from 'path'
import * as fs from 'fs'



const router_app : Router = Router()

router_app.use('/api', async (req: Request, res: Response,nxt) => {
  let ex = req.query.ex as string
  let wd = req.query.width as string
  let hg = req.query.height as string
  let im = req.query.imageName as string

  //check if image exists in output folder
  if (fs.existsSync(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`)) {
    let pth = path.join(
      __dirname,
      `../src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`
    ) as string
    //Return  the image to show it
    await res.status(200).sendFile(pth)
  }  
  nxt()
})





export default router_app







