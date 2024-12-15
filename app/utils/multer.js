const multer = require("multer");
const path = require("path")
const fs = require("fs");
const createHttpError = require("http-errors");
function createRout(req) {
    const date = new Date();
    const year = date.getFullYear().toString()
    const month = date.getMonth().toString()
    const day = date.getDate().toString()
    const directory = path.join(__dirname, "..", "..", "public", "uploads", "blogs", year, month, day);
    req.body.fileUploadPath = path.join("uploads", "blogs", year, month, day)
    fs.mkdirSync(directory, { recursive: true })
    return directory
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file?.originalname) {
            const filePath = createRout(req);
            return cb(null, filePath)
        }
        cb(null, null)
    },
    filename: (req, file, cb) => {
        if (file.originalname) {
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext);
            req.body.filename = fileName
            return cb(null, fileName)
        }
        cb(null, null)
    }
})

function fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    const mimetypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

    if (mimetypes.includes(ext)) {
        return cb(null, true);
    }
    return cb(createHttpError.BadRequest("فرمت ارسال شده تصویر صحیح نمیباشد"));
}

function videoFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    const mimetypes = [".mp4", ".mov", ".mpg", ".avi", ".mkv"];

    if (mimetypes.includes(ext)) {
        return cb(null, true);
    }
    return cb(createHttpError.BadRequest("فرمت ارسال شده ویدیو صحیح نمیباشد"));
}

const PictureMaxSize = 3 * 1000 * 1000
const maxSizeVideo = 300 * 1000 * 1000
const uploadFile = multer({ storage, fileFilter, limits: { fileSize: PictureMaxSize } })
const uploadVideo = multer({ storage, videoFilter, limits: { fileSize: maxSizeVideo } })


module.exports = {
    uploadFile,
    uploadVideo
}