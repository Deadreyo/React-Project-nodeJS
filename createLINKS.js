var fs = require('fs')
var path = require('path')

const dir = './Folders'

import {readDir} from "./createJSON"

const obj = readDir(dir)[0]
obj.link = "link"

fs.writeFile('LINKS.json', JSON.stringify(obj, null, 4), (e) => console.log('ERROR: '+e))
// fs.writeFile('links.json', JSON.stringify(readDir(dir, 'link')[0], null, 4), (e) => console.log('ERROR: '+e))


