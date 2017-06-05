const fs = require('fs')
const path = require('path')
const base = path.resolve(__dirname + '/../')

const makeWorkList = () => {
  fs.readdir(base+'/data/works', (err, files) => {
    if(err) console.log(err)
    files.forEach(file => {
      console.log(file)
    })
  })
}

makeWorkList()

module.export = makeWorkList
