
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
        console.log('file uploaded successfully')
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


// accept base64 string, convert to buffer and upload
const UploadCropImage = (string) => {
    return new Promise((resolve, reject) => {
        let imageName = ''
        const image = string.base64.split(':')
        if(!string){
            return resolve({ status: 'error', error: 'Base64 string is required' })
        }
        if(image && image[0] != 'http'){
            const base64 = string.base64.split(',')[1] // Get the base64 string without the "data:image/jpeg;base64," part
            const buffer = Buffer.from(base64, 'base64') // Decode base64 string to buffer
            const name = `${string.name}-${Date.now()}.${string.extension}`
            const fileName = `${string.destination}${name}`
        
            // Write buffer to a file
            fs.writeFile(fileName, buffer, (err) => {
                if (err) {
                    console.error('Error writing file', err)
                    return resolve({ status: 'error', error: 'Failed to save image' })
                }
                return resolve({ status: 'ok', imageName: name });
            });
        }else{
            return resolve({ status: 'ok', imageName: imageName });
        }
    })
}


module.exports = {
    FileUpload,
    RemoveFile,
    RandomString,
    UploadCropImage,
}