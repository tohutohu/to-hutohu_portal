const yaml = require('js-yaml')
const mkdirp = require('mkdirp')
const im = require('imagemagick')

const fs = require('fs')
const path = require('path')
const base = path.resolve(__dirname + '/../')
const worksDir = path.join(base, '/data/works')
const blogDir = path.join(base, '/data/blog')
const outputDir = base + '/static/json/works/'
const outputBlogDir = base + '/static/json/blog/'
const thumbsDir = base + '/static/thumbs/'
const imagesDir = base + '/static/images/'
const list = [];
const blogList = [];

console.log(base)

mkdirp(outputDir)
mkdirp(outputBlogDir)

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

const replaceImageURL = body => {
  body = body.replace(/!\[(.+)\]\((?:'|")(.+?)(?:'|")(.*)\)/g, '![$1]("/static/images/$2" $3)')
  return body
}

const getImageListFromMarkdown = body => {
  const list = body.match(/(?:!\[(?:.+)\]\((?:'|"))(.+?)(?:(?:'|")(.*)\))/g)
  if(!list) return list
  convert(list)
  return list.map(text => text.replace(/!\[(.+)\]\((?:'|")(.+?)(?:'|")(.*)\)/g, '$2'));
}

const convert = list => {
  list.forEach(uri => {
    im.convert([base+'/data/images/'+uri, imagesDir+uri], (err, stdout) => {
      if(err) console.log(err)
      console.log(stdout)
    })
  })
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

fs.readdir(blogDir, (err, files) => {
  if(err) console.log(err)
  files.forEach(async file => {
    const params = path.parse(file)
    yaml.safeLoadAll(fs.readFileSync(path.join(blogDir , file)), doc => {
      doc.body = replaceImageURL(doc.body);
      const summary = doc.body.slice(0, 60).replace(/\n/g, ' ') + '...'
      const imageList = getImageListFromMarkdown(doc.body) || ['/static/thumbs/default_thumbs.png'];
      const info = {title:doc.title, summary:doc.summary, 
                    thumbnail:imageList[0], 
                    date:doc.date, tags:doc.tags, url:'/static/json/blog/' + params.name + '.json'}
      fs.writeFileSync(outputBlogDir + params.name + '.json', JSON.stringify(doc, replacer, '  '))
      info.summary = summary
      blogList.push(info);
    })
  })
  
  blogList.sort((a, b) => a.date < b.date ? 1:-1)
  fs.writeFileSync(base + '/static/json/blog-list.json', JSON.stringify(blogList, null, '  '))
});
