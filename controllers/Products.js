import Products  from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
    try {
        console.log('Start getProducts');

        const carsData = await Products.findAll({
            attributes: ['uuid', 'plate', 'manufacture', 'model', 'image', 'rentPerDay', 'capacity', 'description'],
        });

        console.log('Cars Data:', carsData);

        res.status(200).json({ carsData });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Products.findOne({
            attributes: ['uuid', 'plate', 'manufacture', 'model', 'image', 'rentPerDay', 'capacity', 'description'],
            where: {
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({ msg: 'Product not found' });

        res.status(200).json({ product });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ msg: error.message });
    }
};
  

export const createProduct = async (req, res) => {
    try {
        const {
            uuid,
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
            year
        } = req.body;

        const newProduct = await Products.create({
            uuid: uuid,
            plate: plate,
            manufacture: manufacture,
            model: model,
            image: image,
            rentPerDay: rentPerDay,
            capacity: capacity,
            description: description,
            availableAt: availableAt,
            transmission: transmission,
            available: available,
            type: type,
            year: year,
        });
        console.log('New Product:', newProduct);
        res.status(201).json({ newProduct });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "Product not found"});

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
        year
    } = req.body;

    try {
        await Products.update({
            plate: plate,
            manufacture: manufacture,
            model: model,
            image: image,
            rentPerDay: rentPerDay,
            capacity: capacity,
            description: description,
            availableAt: availableAt,
            transmission: transmission,
            available: available,
            type: type,
            year: year,
        }, {
            where: {
                id: product.id
            }
        });
        res.status(200).json({msg: "Update Success"});
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ msg: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ msg: 'Invalid UUID parameter' });

        const existingProduct = await Products.findOne({ where: { id } });
        if (!existingProduct) return res.status(404).json({ msg: 'Product not found' });

        await Products.destroy({ where: { id } });

        res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ msg: error.message });
    }
};