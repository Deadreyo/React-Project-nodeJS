/**
 * Makes a copy of the main object, and then checks all properties with respect to secondary object.
 * Missing properties present in secondary object are automatically added to this copy.
 * Different properties in the 2 objects are set based on the secondary.
 * If main object has extra properties, they are kept.
 * 
 * @param {JSON} mainObj The main object 
 * @param {JSON} obj2 The secondary object or old LINKS file
 */
exports.compareFiles = function(mainObj, obj2) {
    const product = JSON.parse(JSON.stringify(mainObj));
    const obj1Keys = Object.keys(mainObj);
    const obj2Keys = Object.keys(obj2);

    for (let objKey of obj1Keys) {
        if(!obj2[objKey]) {
            continue;
        };
        if (mainObj[objKey] !== obj2[objKey]) {
            if(typeof mainObj[objKey] == "object" && typeof obj2[objKey] == "object") {
                product[objKey] = exports.compareFiles(mainObj[objKey], obj2[objKey])
            } 
            else {
                product[objKey] = obj2[objKey];
            }
        }
    }

    for(let objKey of obj2Keys) {
        // if (!product[objKey]) {
        //     product[objKey] = obj2[objKey]
        // }
    }

    product.name = mainObj.name
    return product;
};