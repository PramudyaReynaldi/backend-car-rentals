import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/images");
//     },
//     filename: (req, file, cb) => {
//         const timestamp = new Date().getTime();
//         const originalName = file.originalname;

//         cb(null, `${timestamp}-${originalName}`);
//     }
// });

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
        }
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
        }
    }
})

const upload = multer({ 
    storage: storage
}).single("image");

const uploadIconDisk = multer({
    storage: uploadIcon
}).single("icon");

export { upload, uploadIconDisk };
