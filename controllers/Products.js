import { upload, uploadIconDisk } from "../middleware/UploadDisk.js";
import Products from "../models/ProductModel.js";

// Format the date string DD MM YYYY
function formatDateString(inputDateString) {
    const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    };
    const dateObject = new Date(inputDateString);
    const formattedDate = dateObject.toLocaleDateString("id-ID", options);

    const result = `Updated at ${formattedDate}`;
    return result;
}

export const getImage = (req, res) => {
    const imageName = req.params.imageName;
    const imageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_UPLOAD_NAME}/car-rentals/${imageName}`;

    res.status(200).send({ imageUrl });
};

export const getIcon = (req, res) => {
    const iconName = req.params.iconName;
    const iconUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_UPLOAD_NAME}/car-rentals/icons/${iconName}`;

    res.status(200).send({ iconUrl });
};

export const uploadImage = (req, res) => {
    upload(req, res, async (error) => {
        if (error) {
            res.status(500).send({ msg: error.message });
        } else {
            try {
                const imageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_UPLOAD_NAME}/${req.file.filename}`;
                res.status(200).send({ imageUrl }); // Kembalikan URL gambar
            } catch (error) {
                res.status(500).send({ msg: error.message });
            }
        }
    });
};

export const uploadIcon = (req, res) => {
    uploadIconDisk(req, res, (error) => {
        if (error) {
            res.status(500).send({ msg: error.message });
        } else {
            res.status(200).send({ msg: "Icon uploaded successfully" });
        }
    });
};

export const getProducts = async (req, res) => {
    try {
        const carsData = await Products.findAll({
            attributes: [
                "uuid",
                "id",
                "plate",
                "manufacture",
                "model",
                "image",
                "rentPerDay",
                "capacity",
                "description",
                "transmission",
                "available",
                "year",
                "updatedAt",
            ],
        });

        // Format the date string DD MM YYYY
        const formattedCarsData = carsData.map((car) => {
            const formattedDate = formatDateString(car.updatedAt);
            return { ...car.dataValues, updatedAt: formattedDate };
        });

        if (
            req.headers.accept &&
            req.headers.accept.includes("application/json")
        ) {
            res.status(200).json({ products: formattedCarsData });
        } else {
            res.render("dashboard.ejs", { products: formattedCarsData });
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Products.findOne({
            attributes: [
                "uuid",
                "plate",
                "manufacture",
                "model",
                "image",
                "rentPerDay",
                "capacity",
                "description",
            ],
            where: {
                uuid: req.params.id,
            },
        });
        if (!product) return res.status(404).json({ msg: "Product not found" });

        res.status(200).json({ product });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const {
            plate,
            manufacture,
            model,
            image,
            rentPerDay,
            capacity,
            description,
            availableAt,
            transmission,
            available,
            type,
            year,
        } = req.body;

        const newProduct = await Products.create({
            plate: plate || null,
            manufacture: manufacture || null,
            model: model || null,
            image: image || null,
            rentPerDay: rentPerDay || 0,
            capacity: capacity || 0,
            description: description || null,
            availableAt: availableAt || new Date(),
            transmission: transmission || null,
            available: available || false,
            type: type || null,
            year: year || new Date().getFullYear(),
        });
        res.status(201).json({ newProduct });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id,
            },
        });
        if (!product) return res.status(404).json({ msg: "Product not found" });

        const {
            plate,
            manufacture,
            model,
            rentPerDay,
            capacity,
            description,
            availableAt,
            transmission,
            available,
            type,
            year,
        } = req.body;

        await Products.update(
            {
                plate: plate || product.plate,
                manufacture: manufacture || product.manufacture,
                model: model || product.model,
                rentPerDay: rentPerDay || product.rentPerDay,
                capacity: capacity || product.capacity,
                description: description || product.description,
                availableAt: availableAt || product.availableAt,
                transmission: transmission || product.transmission,
                available: available || product.available,
                type: type || product.type,
                year: year || product.year,
            },
            {
                where: {
                    uuid: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "Update Success" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: "Invalid UUID parameter" });

        const existingProduct = await Products.findOne({ where: { id } });
        if (!existingProduct)
            return res.status(404).json({ msg: "Product not found" });

        await Products.destroy({ where: { id } });

        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ msg: error.message });
    }
};
