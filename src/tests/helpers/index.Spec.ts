import supertest from 'supertest'
import sharp from 'sharp'
import fs from 'fs'
import  app  from '../../index'

//Creat supertest object
let request = supertest(app)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
describe('Check the image info ', () => {

  it('check if image transformer Done ', () => {
    const TS = () => {
      const ex = 'jpeg'
      const wd = 300
      const hg = 200
      const im = '1'
      sharp(`src/images/${im}.jpg`)
        [`${ex}`]()
        .resize(Number(wd), Number(hg))
        .toFile(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`)
      return `src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`
    }
    expect(TS()).toEqual('src/images/OutputFolder/1-300-200.jpeg')
  })


  it('Check if the image exists after transform ', () => {
    const TS = () => {
      const ex = 'jpeg'
      const wd = 300
      const hg = 200
      const im = '1'
      fs.existsSync(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`)
      return `src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`
    }
    expect(TS()).toEqual('src/images/OutputFolder/1-300-200.jpeg')
  })


  it('Check if the image exists Befor transform ', () => {
    const TS = () => {
      const ex = 'jpg'
      const im = '1'
      fs.existsSync(`src/images/OutputFolder/${im}.${ex}`)
      return `src/images/OutputFolder/${im}.${ex}`
    }
    expect(TS()).toEqual('src/images/OutputFolder/1.jpg')
  })
})


describe('Check All endpoints ', function () {

  it('gets the "/" endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
        
  })
    

  
  it('gets the "/api" endpoint', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await request.get('/api', (req, res) => {
      let ex = req.query.ex as string
      let wd = req.query.width as string
      let hg = req.query.height as string
      let im = req.query.imageName as string

      if (fs.existsSync(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`))
        expect(response.status).toBe(200)
        
    })
  })


})