//blog post img 업로더
const handleImgUploader = async (req, res, next) => {
    try {
        const file = req.file;
        res.json({ message: 'success', imgUrl: file.url });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    handleImgUploader,
};
