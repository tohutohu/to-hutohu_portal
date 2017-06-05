const yaml = require('js-yaml')
const mkdirp = require('mkdirp')
const im = require('imagemagick')

const fs = require('fs')
const path = require('path')
const base = path.resolve(__dirname + '/../')
const worksDir = path.join(base, '/data/works')
const outputDir = base + '/static/json/works/'
const thumbsDir = base + '/static/thumbs/'
const imagesDir = base + '/static/images/'
const list = [];

console.log(base)

mkdirp(outputDir)

const replacer = (key, value) => {
  console.log('po')
  console.log(key, value)
  if(key === 'images'){
    return value.map(url => {
      im.convert([base+'/data/images/'+url, '-thumbnail', '200x130', thumbsDir+url], (err, stdout) => {
        if(err) console.log(err)
        console.log(stdout)
      })
      im.convert([base+'/data/images/'+url, imagesDir+url], (err, stdout) => {
        if(err) console.log(err)
        console.log(stdout)
      })
      return '/static/images/'+url
    })
  }
  return value
}

fs.readdir(worksDir, (err, files) => {
  if(err) console.log(err)
  files.forEach(async file => {
    const params = path.parse(file)
    yaml.safeLoadAll(fs.readFileSync(path.join(worksDir , file)), doc => {
      //console.log(doc)
      const info = {title:doc.title, summary:doc.summary, 
                    thumbnail:'/static/thumbs/'+doc.images[0], 
                    date:doc.date, tags:doc.tags, url:'/static/json/works/' + params.name + '.json'}
      fs.writeFileSync(outputDir + params.name + '.json', JSON.stringify(doc, replacer, '  '))
      list.push(info);
    })
  })
  list.sort((a, b) => a.date < b.date ? 1:-1)
  fs.writeFileSync(base + '/static/json/works-list.json', JSON.stringify(list, null, '  '))
});
