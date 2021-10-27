var fs = require('fs')
const combineJSON = require('./combineJSON').combineJSON


// const tree = dirTree('./', {normalizePath: true})
// for(let ch of tree.children) {
//   console.log(JSON.parse(JSON.stringify(ch)))
//   // if(ch.children?.length > 0) {
//   //   console.log(ch)
//   // }
// // }
// const jsonFile = require('../hirarchy.json')
// console.log(jsonFile)

// // let json = JSON.parse(jsonFile)
// let product = JSON.stringify(jsonFile)


// fs.writeFile(`./dist/${jsonFile.name}.json`, product, (e) => console.log('ERROR: '+e))
// fs.writeFile('links.json', JSON.stringify(readDir(dir, 'link')[0], null, 4), (e) => console.log('ERROR: '+e))


const hierarchy = require('../hirarchy.json')
const LINKS = require('../LINKS.json')
try{
    fs.rename('combined.json', 'combined-backup.json', (e) => console.log('ERROR: '+e))
}catch(e){};
let compare = combineJSON(hierarchy, LINKS)
fs.writeFile('combined.json', JSON.stringify(compare, null, 4), (e) => console.log('ERROR: '+e))
fs.writeFile(`./dist/${compare.name}.json`, JSON.stringify(compare), (e) => console.log('ERROR: '+e))


