const multer = require('multer');
const path = require('path');

function changeFileName(req, file, cb) {
	const fileName = file.originalname;
	const newFileName = `${req.user.id}-${Date.now()}-image${path.extname(
		fileName
	)}`;
	cb(null, newFileName);
}

const storage = multer.diskStorage({
	destination: 'public/images/posts',
	filename: changeFileName,
});

const uploader = multer({
	storage: storage,
});

module.exports = (req, res, next) => {
	const upload = uploader.single('file-upload');
	upload(req, res, (err) => {
		const file = req.file;
		res.imageUrl = file?.path;
		next();
	});
};
