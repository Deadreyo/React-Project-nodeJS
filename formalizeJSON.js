var fs = require('fs')
var path = require('path')
var dirTree = require('directory-tree')
const { default: fetch } = require('cross-fetch')


// const tree = dirTree('./', {normalizePath: true})
// for(let ch of tree.children) {
//   console.log(JSON.parse(JSON.stringify(ch)))
//   // if(ch.children?.length > 0) {
//   //   console.log(ch)
//   // }
// }
const jsonFile = require('./hirarchy.json')
console.log(jsonFile)

// let json = JSON.parse(jsonFile)
let product = JSON.stringify(jsonFile)


fs.writeFile(`./dist/${jsonFile.name}.json`, product, (e) => console.log('ERROR: '+e))
// fs.writeFile('links.json', JSON.stringify(readDir(dir, 'link')[0], null, 4), (e) => console.log('ERROR: '+e))


