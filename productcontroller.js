const Product = require('../model/productmodel');

exports.getProducts = async (req, res) => {
    try {
        const result = await Product.find()
        if (!result) {
            return res.status(400).json({ message: 'unable to find products' })
        }
        res.status(200).json({ status: 'success', result })
    }
    catch (err) {
        res.status(500).json({ status: 'failed', message: 'Internal server error', error: err.message });
    }
}



// Handle adding a new product
exports.AddProduct = async (req, res) => {
    try {
        const { product_name, img_url, description } = req.body

        if (!product_name) {
            return res.status(400).json({ message: 'please provide valid product' })
        }

        if (!img_url) {
            return res.status(400).json({ message: 'please provide valid image url' })
        }
        if (!description) {
            return res.status(400).json({ message: 'please provide valid description' })
        }
        // Creating the product using the provided data
        const result = await Product.create({ product_name, img_url, description });
        console.log(result);

        res.status(200).json({ status: 'success', result });
    } catch (err) {
        //console.log(err)
        res.status(500).json({ status: 'failed', message: 'Internal server error', error: err.message });
    }
};

// Handle fetching and rendering the edit product page

exports.editProduct = async (req, res) => {
    try {
        const prodId = req.params.prodId;
        const { product_name, img_url, description } = req.body;
        if (!prodId) {
            return res.status(400).json({ message: 'please provide valid prodId' })
        }
        // Fetch the product from the database using the Product model
        const product = await Product.findOneAndUpdate(
            { _id: prodId }, // Filter to find the product to update
            { product_name, img_url, description }, // Updated fields
            { new: true } // Return the updated document in the response
        );

        if (!product) {  // If the product is not found, respond with an error
            return res.status(404).json({ status: 'failed', message: 'Product not found' });
        }

        // If the product is found, you can perform any operations on it if needed
        console.log(product);
        res.status(200).json({ status: 'success', data: product }); // You can send the product data back in the response if needed
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'failed', message: 'Internal server error', error: err.message });
    }
};

// Handle deleting a product
exports.delete = async (req, res) => {
    try {
        const prodId = req.params.prodId
        if (!prodId) {
            return res.status(400).json({ message: 'please provide valid prodId' })
        }
        const product = await Product.findByIdAndDelete({ _id: prodId })

        if (!product) {
            res.status(404).json({ message: 'unable to delete the product' })
        }

        res.status(200).json({ message: 'successfully deleted' })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 'failed', message: 'Internal server error', error: err.message });
    }
};