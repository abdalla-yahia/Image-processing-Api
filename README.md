# project Title : Image Processing Api 

## Contents :-

- [dist]

- -------[tests]
- -------[helpers]
- -------(app.js)      
- -------(index.js)      
- -------(creatimage.js)      
- -------(showimage.js)

- [node_modules]
- [spec]
- -------[helpers]
- --------------[jasmine_examples]
- --------------[support]
- -------------------(jasmine.json)

- [src]
- ------[Css]
- --------------(style.css)
- ------[images]
- --------------(1.jpg)
- --------------(2.jpg)
- --------------(3.jpg)
- --------------(4.jpg)
- --------------(5.jpg)
- --------------[newfold]('The output folder contains the converted image')
- -------[tests]
- -------------[helpers]
- -(app.ts)
- -(creatimage.ts)
- -(index.ts)
- -(showimage.ts)

- -(eslintrc.js)

- -(prettierignore)
- -(prettierrc.json)

- -(index.html)

- -(package-lock.json)
- -(package.json)

- -(tsconfig.json)
 
- -(READMEE.md)

## Description

- This project is about converting images based on the input it receives from the client like image name, height, width, extension... After receiving data from the client, it looks for the image if it is in the output folder, the program displays it without creating a new one, but if It doesn't exist, it looks for the output folder and creates the output folder, then puts the image inside and finally shows it to the client

## Docs

1) - Write this path to run it in local server http://localhost:5000/
2) - Choose the image extension
3) - Choose the picture
4) - Choose the width you want the images to appear in
5) - Choose the height you want the images to appear in
6) - Finally, click on the show button to see the image in the size and extension you chose.

## How it work
- to run the server---------------------------[npm run start  ]
- to run test---------------------------------[npm run jasmine]
- to build the javascript files---------------[npm run build  ]
- to run build js-fils && run server----------[npm run start: ]
- to run build js-fils && run jasmine test----[npm run test   ]


## Built with

- [Abdalla-Yahia-Kamell](abdalla_y2007@yahoo.com)

### Date

- [Sun Aug 14 2022]
