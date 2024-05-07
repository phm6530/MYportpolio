const multer = require('multer');
const fs = require('fs');
const path = require('path');

const limits = {
    fieldNameSize: 200, //필드명 사이즈 최대값
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
};

const fileFilter = (req, file, callback) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];

    if (fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png') {
        callback(null, true);
    } else {
        return callback(null, false);
    }
};

const blogStorage = multer.diskStorage({
    // 파일경로 설정
    destination: (req, _, cb) => {
        const key = req.params.key;
        console.log(key);
        // uploads 파일 안에 category, subCategory 구성함
        const uploadPath = path.join(global.appRoot, 'uploads', 'blog', key);
        if (!fs.existsSync(uploadPath)) {
            // 폴더가 존재하지 않는 경우 폴더생성
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const key = req.params.key;

        const dateString = new Date()
            .toISOString()
            .replace(/:/g, '')
            .replace(/-/g, '')
            .replace('T', '')
            .replace(/\..+/, '');

        const [originName, ext] = file.originalname.split('.');

        const newFilename = `${originName}_${dateString}.${ext}`;
        file.url = `${process.env.END_POINT}/uploads/blog/${key}/${newFilename}`;

        cb(null, newFilename);
    },
});

//blogUpload
const blogUpload = multer({ storage: blogStorage });

module.exports = {
    blogUpload,
};