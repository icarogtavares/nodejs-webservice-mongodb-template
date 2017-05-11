import express from 'express';
import ProductsController from '../controllers/products'
import Product from '../models/product';

const router = express.Router();
const productsController = new ProductsController(Product);

router.route('/').get((req, res) => productsController.get(req, res));

router.route('/').post((req, res) => productsController.post(req, res));

export default router;