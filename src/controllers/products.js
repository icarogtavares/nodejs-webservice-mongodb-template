import memjs from 'memjs';
import util from 'util';

class ProductsController {
	
	constructor(Product) {
		this.Product = Product;
		this.memjsClient = memjs.Client.create();
	}

	get(req, res) {
		return this.Product.find({})
			.then(products => res.send(products))
			.catch(err => res.status(400).send(err.message));
	}

	findById(req, res) {

		let productId = req.params.id;

		// this.memjsClient.get(productId, (err, val) => res.send(val));

		return this.Product.findById(productId)
			.then(product => {
				if(!product) throw Error('Produto não encontrado');
				
				res.send(product);
			})
			.catch(err => res.status(400).send(err.message));
	}

	post(req, res) {
		req.checkBody('name', 'Name is empty').notEmpty();
		req.checkBody('description', 'Description is empty').notEmpty();
		req.checkBody('price', 'Price is empty').notEmpty().withMessage('Invalid price, must be a decimal').isFloat();

		req.getValidationResult().then(result => {
			if(!result.isEmpty()) {
				res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      			return;
			}
		})

		req.sanitizeBody('name').trim();
		req.sanitizeBody('description').trim();

		var product = req.body;

		return this.Product.create(product)
			.then(product => {

				//HATEOAS
				var response = {
		        	'product': product,
		          	links: [
		            	{
		              	href:`${req.originalUrl}/${product._id}`,
			              	rel:"update",
			              	method:"PUT"
		            	},
		            	{
		              	href:`${req.originalUrl}/${product._id}`,
			              	rel:"delete",
			              	method:"DELETE"
		            	}
		          	]
		        }

				res.location('/products/' + product._id);

				// this.memjsClient.set(product._id, product, {expires: 60000}, (err, val) => {})

				res.status(201).send(response);
			})
			.catch(err => res.status(400).send(err.message));
	}

	put(req, res) {
		return this.Product.findBydIdAndUpdate(req.params.id, req.body)
			.then(product => {
				// this.memjsClient.set(product._id, product, {expires: 60000}, (err, val) => {})
				res.send(product);
			})
			.catch(err => res.status(400).send(err.message));
	}

	delete(req, res) {
		return this.Product.remove({ _id: req.params.id })
			.then(() => res.status(204).end())
			.catch(err => res.status(400).send(err.message));
	}
}


export default ProductsController;