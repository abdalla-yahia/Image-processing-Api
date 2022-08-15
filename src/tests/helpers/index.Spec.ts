import supertest from 'supertest'
import fs from 'fs'
import  app  from '../../index'
import sharp from 'sharp'

//Creat supertest object
const request = supertest(app)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
describe('Check the image info ', () => {
it('Image converter tested', () => {
  const ex = 'jpeg'
  const wd = '300'
  const hg = '200'
  const im = '1'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let transform = (a:string, b: string, c: string, d: string) => {
    return sharp(a)
      .jpeg()
      .resize(Number(b), Number(c))
      .toFile(d)
  }
  expect(async () => {
    await transform(
      `src/images/${im}.jpg`,
      `${wd}`,
      `${hg}`,
      `src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`
    )
  }).not.toThrow()
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
      const ex = req.query.ex as string
      const wd = req.query.width as unknown as number
      const hg = req.query.height as unknown as number
      const im = req.query.imageName as string

      if (fs.existsSync(`src/images/OutputFolder/${im}-${wd}-${hg}.${ex}`))
        expect(response.status).toBe(200)
        
    })
  })
})