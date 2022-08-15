import { Router, Request, Response } from 'express'
import * as fs from 'fs'

//Creat router
const router_Cr_Ot_Folder: Router = Router()

router_Cr_Ot_Folder.use('/api', (req: Request, res: Response, nxt): void => {
  //Check if output folder not exists
  if (fs.existsSync('src/images/OutputFolder') === false) {
    //Creat output folder
    fs.mkdir('src/images/OutputFolder', (err):void => {
      err ? console.log('Folder Not Created!!!', err) : ''
    })
  }
  nxt()
})

export default router_Cr_Ot_Folder as Router