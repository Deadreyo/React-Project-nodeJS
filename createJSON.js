var fs = require('fs')
var path = require('path')


// const tree = dirTree('./', {normalizePath: true})
// for(let ch of tree.children) {
//   console.log(JSON.parse(JSON.stringify(ch)))
//   // if(ch.children?.length > 0) {
//   //   console.log(ch)
//   // }
// }
const dir = './Folders'

/**
 * 
 * @param {string} dir Path to the folder to start from
 * @param {'normal' | 'link'} mode Default: normal. "normal" used for creating the main json, "link" used to create another json only for links. Merge later
 * @param {() => void} FileCallback 
 * @param {() => void} FolderCallback 
 */
export function readDir(dir, mode = 'normal',FileCallback, FolderCallback) {
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
        obj.date = "20"
        fixedName = fixedName.replace(" - 21", "")
      }
      fixedName = fixedName.replace(/\s/g, "_")
    }

    obj.name = fixedName
    if(!isDir) obj.link = "link"
    if(isDir) obj.children = children

    totalObj.push(obj)
  })

  return totalObj
}

const obj = readDir(dir)[0]
obj.link = "link"

fs.writeFile('hirarchy.json', JSON.stringify(obj, null, 4), (e) => console.log('ERROR: '+e))


