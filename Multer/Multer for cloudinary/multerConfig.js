const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads"); 
        // create "./uploads" file in main directory
    },
    filename: (req, file, callback) => {
        const fileName = Date.now() + '-' + file.originalname
        callback(null, fileName)
    }
})

const filefilter = (req, file, callback) => {
    if( file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ){
        callback(null, true)
    }
    else{
        callback(null, false)
        callback(new Error("Invalid file"))
    }
}

const upload = multer({
    storage : storage,
    filefilter: filefilter
})

module.exports = upload;