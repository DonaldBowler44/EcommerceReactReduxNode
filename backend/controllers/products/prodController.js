const path = require('path');
const Product = require('../../models/Product');
const multer = require('multer');

// configure mutler for fiel uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
      },
      filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
        // cb(null, `${Date.now()}_${file.originalname}`)
      }
});

const upload = multer({ storage: storage });

async function uploadProduct(req, res) {
    try {
          const imageUrl = req.file.path.replace(/\\/g, '/');
          const fullUrl = req.protocol + '://' + req.get('host') + '/' + imageUrl;
  
          const product = new Product({
            title: req.body.title,
            desc: req.body.desc,
            imageUrl: fullUrl,
            price: req.body.price,
            quantity: req.body.quantity 
          });
    
          await product.save();
          res.status(200).json(product);
      } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: 'An error occurred while uploading the image' });
      }
    }

    //method to show all the products in the database
  const showallProducts = async (req, res) => {
    try {
        let AllProducts = await Product.find({});
        res.status(200).send(AllProducts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  }

    //method to get product by id
    const getProductById = async (req, res) => {
        const id = req.params.prodId;
    
        try {
            const product = await Product.findOne({ _id: id });
    
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
    
            return res.json(product);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Something went wrong'});
        }
      };
 
      module.exports = { getProductById, showallProducts, uploadProduct, upload };


