import { Router, Request, Response } from 'express'
import sharp from 'sharp'
import * as fs from 'fs'
import router_app from './app'

//Creat router
const router_creat : Router = Router()


router_creat.use('/api', (req: Request, res: Response, nxt) => {
  //Check if output folder not exists
  if (fs.existsSync('src/images/OutputFolder') === false) {
    //Creat output folder
    fs.mkdir('src/images/OutputFolder', (err) => {
      err ? console.log('Folder Not Created!!!', err) : ''
    })
  }
  nxt()
})

router_creat.use(router_app)

router_creat.all('/api', (req: Request, res: Response, nxt) => {
  let ex = req.query.ex as string
  let wd = req.query.width as string
  let hg = req.query.height as string
  let im = req.query.imageName as string
    //Check if the image choosen is  not exsits 
  if (
    fs.existsSync(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`) === false
  ) {
    //Creat the image after transform it
    sharp(`src/images/${im}.jpg`)
      [`${ex}`]()
      .resize(Number(wd), Number(hg))
      .toFile(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`)
  } 
  nxt()
})

router_creat.all('/api', async (req: Request, res: Response, nxt) => {
  let ex = req.query.ex as string
  let wd = req.query.width as string
  let hg = req.query.height as string
  let im = req.query.imageName as string

  if (
    fs.existsSync(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`) === false
  ) {
    await sharp(`src/images/${im}.jpg`)
      [`${ex}`]()
      .resize(Number(wd), Number(hg))
      .toFile(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`)
  }
  nxt()
})



export default router_creat as Router



