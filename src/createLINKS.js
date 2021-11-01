var fs = require('fs')
const compareJSON = require('./compareFiles').compareFiles

const dir = './Folders'

const readDir = require('./readDir').readDir

const obj = readDir(dir, 'link')[0]
obj.source = ["link1", "link2", "link3"]
obj.credits = ["name1 - year", "name2 - 2019", "name3 - 2018"]

const oldLINKSfile = require('../LINKS.json')

fs.rename('LINKS.json', 'LINKS-backup.json', (e) => console.log('ERROR: '+e))
let compare = compareJSON(obj, oldLINKSfile)
fs.writeFile('LINKS.json', JSON.stringify(compare, null, 4), (e) => console.log('ERROR: '+e))

/**
 * Renames the old LINKS file to "LINKS-backup"
 * Copies the hierarchy of the first folder inside "Folders" then:
 * Compares the already-existing file with the new object, and produce a file that has the old data plus the new things
 */
