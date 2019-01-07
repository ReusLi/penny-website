const upload = require('jquery-file-upload-middleware');

const pathConfig = require('../config/pathConfig');

upload.configure({
    uploadDir: pathConfig.IMG_LIB_PATH,
    uploadUrl: '/uploads',
    imageVersions: {
        thumbnail: {
            width: 80,
            height: 80
        }
    }
})

module.exports = upload