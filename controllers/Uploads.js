import { upload, uploadIconDisk } from "../middleware/UploadDisk.js";

export const getImage = (req, res) => {
    const imageName = req.params.imageName;
    const imageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_UPLOAD_NAME}/car-rentals/${imageName}`;

    res.status(200).send({ imageUrl });
};

export const getIcon = (req, res) => {
    const iconName = req.params.iconName;
    const iconUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_UPLOAD_NAME}/car-rentals/icons/${iconName}`;

    res.status(200).send({ iconUrl });
}

export const uploadImage = (req, res) => {
    upload(req, res, (error) => {
        if(error) {
            res.status(500).send({msg: error.message});
        } else {
            res.status(200).send({msg: "Image uploaded successfully"})
        }
    });
};

export const uploadIcon = (req, res) => {
    uploadIconDisk(req, res, (error) => {
        if(error) {
            res.status(500).send({msg: error.message});
        } else {
            res.status(200).send({msg: "Icon uploaded successfully"})
        }
    })
}