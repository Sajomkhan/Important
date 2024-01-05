const multer = require('multer');

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    const fileName = Date.now() + '-' + file.originalname
    callback(null, fileName)
}
});

const upload = multer({storage: storage});

module.exports = upload;