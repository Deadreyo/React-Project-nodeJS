/**
 * Makes a copy of the hierarchy object, and then copies all links from LINKS object
 * to the copy object, effectively merging them.
 * 
 * @param {JSON} hierarchy The main object 
 * @param {JSON} links The secondary object
 */
exports.combineJSON = function(hierarchy, links) {try{
    const product = JSON.parse(JSON.stringify(hierarchy));

    if(links['link']) product['link'] = links['link'];
    if(links['source']) product['source'] = links['source'];
    if(hierarchy['children']) {
        product['children'] = product['children'].map(element => {
            let id = product['children'].indexOf(element)
            return exports.combineJSON(hierarchy['children'][id], links['children'][id])
        }); 
    }

    return product;
}catch(e){console.log('Combine Error: '+e)}};