
const fs = require('fs');




const FileUpload = (file) => {
    if(file.types.length == 0){
        return { error: '*Allowed file types is required'}
    }
    const imageType = file.file.name.split('.').pop().toLowerCase()
    if(!file.types.includes(imageType)){
        return { error: '*File type ' + imageType + ' is not allowed'}
    }

    const allowedFileSize = (file.size / 1000) * 1024 * 1024
    if(allowedFileSize < file.file.size){
        return { error: '*Maximum file size of ' + file.size}
    }

    //Ensure the directory exists
    if (!fs.existsSync(file.destination)) {
        fs.mkdirSync(file.destination, { recursive: true });
    }
    // upload the file
    if(file.file && file.file.name){
        const string = RandomString()
        const newName = file.name + string + '.' +imageType
        const uploadPath = file.destination + newName
        file.file.mv(uploadPath, (error) => {
            if(error){
                return console.log(error)
            }
        })
        return { status: true, newName: newName}
    }
    return { status: 'error'}
}




const RandomString = (string) => {
    const date = new Date();
    const timestamp = date.getTime(); // Number of milliseconds since 1970/01/01
    // const randomString = Math.random().toString(36).substring(2, 10); // Random string
    return timestamp
}




const RemoveFile = (filePath) => {
    fs.stat(filePath, function (error, stats) {
        if (error) {
            return console.error("File does not exists")
            // return console.error(error)
        }
        fs.unlink(filePath, function(error){
            if(error) return console.log(error)
            console.log('file deleted successfully')
        });  
    });
}


module.exports = {
    FileUpload,
    RemoveFile,
    RandomString,
}