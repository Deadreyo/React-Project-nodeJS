var fs = require('fs')
var path = require('path')
const readDir = require('./readDir').readDir

const dir = './Folders'

const obj = readDir(dir)[0]

fs.rename('hirarchy.json', 'hirarchy-backup.json', (e) => console.log('ERROR: '+e))
fs.writeFile('hirarchy.json', JSON.stringify(obj, null, 4), (e) => console.log('ERROR: '+e))

/**
 * Renames the old hirarchy file to "hirarchy-backup"
 * Copies the hierarchy of the first folder inside "Folders" directory and make a JSON file based on it named "hirarchy"
 */
