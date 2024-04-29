import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage ({
    cloudinary: cloudinary,
    params: {
        folder: 'car-rentals',
        allowedFormats: ['jpg', 'png'],
        filename: function (req, file, cb) {
            const timestamp = new Date().toISOString();
            const originalName = file.originalname;
            const uniqueFilename = `${timestamp}-${originalName}`;
            return uniqueFilename;
        },
        secure: true,
        sameSite: 'none'
    }
});

const uploadIcon = new CloudinaryStorage ({
    cloudinary: cloudinary,
    params: {
        folder: 'car-rentals/icons',
        allowedFormats: ['jpg', 'png'],
        filename: function (req, file, cb) {
            const timestamp = new Date().toISOString();
            const originalName = file.originalname;
            const uniqueFilename = `${timestamp}-${originalName}`;
            return uniqueFilename;
        },
        secure: true,
        sameSite: 'none'
    }
})

const upload = multer({ 
    storage: storage
}).single("image");

const uploadIconDisk = multer({
    storage: uploadIcon
}).single("icon");

export { upload, uploadIconDisk };