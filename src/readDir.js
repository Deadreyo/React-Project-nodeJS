var fs = require('fs')
var path = require('path')
const { extname } = require('path')

/**
 * 
 * @param {string} dir Path to the folder to start from
 * @param {'normal' | 'link'} mode Default: normal. "normal" used for creating the main json, "link" used to create another json only for links. Merge later
 * @param {() => void} FileCallback 
 * @param {() => void} FolderCallback 
 */
function readDir(dir, mode = 'normal') {
  let totalObj = []
  fs.readdirSync(dir).forEach( fileName => {

    // console.log(fileName)
    var filepath = path.join(dir, fileName)
    var isDir = fs.statSync(filepath).isDirectory()


    var children = null

    if(isDir) {
      var children = readDir(filepath, mode)
    } else {
      //
    }

    
    let obj = {}
    let fixedName = fileName;
    if(mode === 'normal') {
      if(fileName.indexOf(' - 19') > 0) {
        obj.date = "19"
        fixedName = fixedName.replace(" - 19", "")
      }
      if(fileName.indexOf(' - 20') > 0) {
        obj.date = "20"
        fixedName = fixedName.replace(" - 20", "")
      }
      if(fileName.indexOf(' - 21') > 0) {
        obj.date = "21"
        fixedName = fixedName.replace(" - 21", "")
      }
      fixedName = fixedName.replace(/\s/g, "_")
    }

    obj.name = fixedName
    if(extname(fileName) === '.txt') {
      if(fileName.slice(0, 4) === 'note') obj.note = fs.readFileSync(filepath).toString()
      if(fileName.slice(0, 7) === 'credits') obj.credits = fs.readFileSync(filepath).toString()
    } else {
      if(mode === 'link') if(!isDir) obj.link = ""
      if(isDir) obj.children = children
    }

    totalObj.push(obj)
  })

  return totalObj
}

module.exports = { readDir }