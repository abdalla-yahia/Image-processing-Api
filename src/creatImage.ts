import { Router, Request, Response } from 'express'
import sharp from 'sharp'
import * as fs from 'fs'

//Creat router
const router_creat: Router = Router()
const arr_Names: string[] = ['1', '2', '3', '4', '5']
const arr_Extension: string[] = ['jpeg', 'jpg', 'png', 'gif']

router_creat.all(
  '/api',
  async (req: Request, res: Response, nxt): Promise<object | void> => {
    const ex = req.query.ex as string
    const wd = req.query.width as string
    const hg = req.query.height as string
    const im = req.query.imageName as string

    //Check if the image choosen is  not exsits
    if (
      fs.existsSync(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`) === false
    ){
      if (!im){
        return res
          .status(400)
          .send(
            '<h1>Oh no... the <span style="color:red">Name</span> of the picture is missing...! </h1>'
          )
      } else if (!arr_Names.includes(im)) {
        return res
          .status(400)
          .send(
            '<h1>Impossible... <span style="color:red">Picture Name</span> not found...!</h1>'
          )
      } else if (!ex) {
        return res
          .status(400)
          .send(
            '<h1>Oops....the image <span style="color:red">Extension</span> is missing !!</h1>'
          )
      } else if (!arr_Extension.includes(ex)) {
        return res
          .status(400)
          .send(
            '<h1>Impossible... <span style="color:red">Picture Extension </span> not found...!</h1>'
          )
      } else if (!wd) {
        return res
          .status(400)
          .send(
            '<h1>how are you ?? The image <span style="color:red">Width</span> is missing...</h1> '
          )
      } else if (wd === '0') {
        return res
          .status(400)
          .send(
            '<h1>Impossible... The <span style="color:red"> Type of Width</span> you entered for the image is <span style="color:orange">ZERO</span>...</h1>'
          )
      } else if (wd.match(/\D/g)) {
        return res
          .status(400)
          .send(
            '<h1>Impossible... The <span style="color:red"> Type of Width</span> you entered for the image is unknown...</h1>'
          )
      } else if (!hg) {
        return res
          .status(400)
          .send(
            '<h1>No way... the <span style="color:red">Height</span> of the image is missing...</h1>'
          )
      } else if (hg === '0') {
        return res
          .status(400)
          .send(
            '<h1>Impossible... The <span style="color:red"> Type of Height</span> you entered for the image is <span style="color:orange">ZERO</span>...</h1>'
          )
      } else if (hg.match(/\D/g)) {
        return res
          .status(400)
          .send(
            '<h1>Impossible... The <span style="color:red"> Type of Height</span> you entered for the image is unknown...</h1>'
          )
      } else {
        await sharp(`src/images/${im}.jpg`)
          .jpeg()
          .resize(Number(wd), Number(hg))
          .toFile(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`)
      }
    }
    nxt()
  }
)

export default router_creat as Router
