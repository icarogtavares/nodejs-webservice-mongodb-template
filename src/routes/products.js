import express from 'express';
import ProductsController from '../controllers/products'
import Product from '../models/product';

const router = express.Router();
const productsController = new ProductsController(Product);

router.route('/')
	.get((req, res) => productsController.getAll(req, res))
	.post((req, res) => roductsController.post(req, res));

export default router;