const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { pageCalculator } = require('../featrues/common/paging');
const { searchFilter, queryStringFilter } = require('../featrues/common/filter');

const getBlogPosts = async (data, page, category, itemParam, searchParam) => {
    const { firstIdx, lastIdx } = pageCalculator(page);
    const filterData = queryStringFilter(data, category, itemParam);
    const resultData = searchParam ? searchFilter(filterData, searchParam) : filterData;

    return {
        data: resultData.slice(firstIdx, lastIdx),
        paging: Math.ceil(resultData.length / 10),
    };
};

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
        const { category: categories, key } = req.params;
        const [category, subCategory] = categories.split(':');

        // uploads 파일 안에 category, subCategory 구성함
        const uploadPath = path.join(global.appRoot, 'uploads', category, subCategory, key);

        if (!fs.existsSync(uploadPath)) {
            // 폴더가 존재하지 않는 경우 폴더생성
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const { category: categories, key } = req.params;
        const [category, subCategory] = categories.split(':');

        const categoryUrl = `${category}/${subCategory}/`;

        const date = new Date();
        const dateString = date.toISOString().replace(/:/g, '').replace(/-/g, '').replace('T', '').replace(/\..+/, '');

        const [originName, ext] = file.originalname.split('.');

        const newFilename = `${originName}_${dateString}.${ext}`;
        file.url = `${categoryUrl}${key}/${newFilename}`;
        cb(null, newFilename);
    },
});

module.exports = {
    getBlogPosts,
    blogStorage,
};
