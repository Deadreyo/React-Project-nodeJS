
// another appraoch

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }
  
  function isArray(item) {
    return (item && Array.isArray(item));
  }
  
/**
 * Makes a copy of the main object, and then checks all properties with respect to secondary object.
 * Missing properties present in secondary object are automatically added to this copy.
 * Different properties in the 2 objects are set based on the secondary.
 * If main object has extra properties, they are kept.
 * Changes the target object.
 * 
 * @param {JSON} mainObj The main object 
 * @param {JSON} obj2 The secondary object or old LINKS file
 */
exports.mergeDeep = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();
  
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
            //if source has a key that isnt present in target, it is ignored
            if(target[key] === undefined) {
                continue
            }
        if (isObject(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            mergeDeep(target[key], source[key]);
        } else if (isArray(source[key])) {
            //checks if it is an Array
            if(source[key][0]['name']) {
                //is a 'children' array, detected by having objects with "name" key.
                for(let ob of source[key]) {
                    //then, filters the elements of the array in Target that are also present in Source
                    let found = (target[key]).filter( (obj) => (obj['name'] === ob['name']))[0]
                    //if found a common element, mergeDeep it. If an element is in Target but not in Source, no edits.
                    exports.mergeDeep(found, ob)
                }
            } else {
                //is an array of other things, not 'children'
                //Directly overwrite it
                Object.assign(target, { [key]: source[key] });
            }
        } else {
            //neither an Object nor an Array. Directly overwrite it.
            
            if(key !== 'name') Object.assign(target, { [key]: source[key] });
        }
      }
    }
  
    return exports.mergeDeep(target, ...sources);
}