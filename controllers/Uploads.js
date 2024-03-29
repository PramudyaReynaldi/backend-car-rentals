// import { upload, uploadIconDisk } from "../middleware/UploadDisk.js";
// import Products from "../models/ProductModel.js";

// export const getImage = (req, res) => {
//     const imageName = req.params.imageName;
//     const imageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_UPLOAD_NAME}/car-rentals/${imageName}`;

//     res.status(200).send({ imageUrl });
// };

// export const getIcon = (req, res) => {
//     const iconName = req.params.iconName;
//     const iconUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_UPLOAD_NAME}/car-rentals/icons/${iconName}`;

//     res.status(200).send({ iconUrl });
// }

// export const uploadImage = (req, res) => {
//     upload(req, res, (error) => {
//         if(error) {
//             res.status(500).send({msg: error.message});
//         } else {
//             res.status(200).send({msg: "Image uploaded successfully"})
//         }
//     });
// };

// export const uploadImage = (req, res) => {
//     upload(req, res, async (error) => {
//         if(error) {
//             res.status(500).send({msg: error.message});
//         } else {
//             try {
//                 const imageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_UPLOAD_NAME}/${req.file.filename}`;
//                 const newProduct = await Products.create({ 
//                     image: imageUrl,
//                     plate: 'N/A', // Misalnya 'N/A' untuk kolom yang tidak relevan
//                     manufacture: 'N/A',
//                     model: 'N/A',
//                     rentPerDay: 0,
//                     capacity: 0,
//                     description: 'N/A',
//                     availableAt: new Date(),
//                     transmission: 'N/A',
//                     available: false,
//                     type: 'N/A',
//                     year: new Date().getFullYear()
//                 });
//                 res.status(200).send({ imageUrl });
//             } catch (error) {
//                 res.status(500).send({msg: error.message});
//             }
//         }
//     });
// };

// export const uploadIcon = (req, res) => {
//     uploadIconDisk(req, res, (error) => {
//         if(error) {
//             res.status(500).send({msg: error.message});
//         } else {
//             res.status(200).send({msg: "Icon uploaded successfully"})
//         }
//     })
// }