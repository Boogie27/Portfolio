
const multer = require('multer');
const path = require('path');

// Function to create multer storage with dynamic destination
const createStorage = (destination) => multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Function to initialize upload middleware
const createUpload = (destination) => {
    const storage = createStorage(destination);

    return multer({
        storage: storage,
        limits: { fileSize: 1000000 }, // 1MB limit
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb);
        }
    }).single('image');
};

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}





module.exports = {
    createUpload,
}