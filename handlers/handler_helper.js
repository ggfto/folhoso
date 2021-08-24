const fs = require('fs');

function getFiles(dir, ext) {
    try {
        return fs.readdirSync(`./${dir}/`).filter(file => file.endsWith(`.${ext}`));
    } catch(error) {
        console.error(error);
    }
}

exports.populateCollection = function(collection, dir) {
    for(const file of getFiles(dir, 'js')) {
        const obj = require(`../${dir}/${file}`);
        if(obj.name)
            collection.set(obj.name, obj);
        else
            continue;
    }    
}