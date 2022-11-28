function isValide(value){
    return (typeof value === "string" &&  value.trim().length > 0 && value.match(/^[\D]+$/))
}

module.exports.isValide=isValide