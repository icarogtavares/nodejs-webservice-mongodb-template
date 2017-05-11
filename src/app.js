import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import routes from './routes';
import middlewares from './middlewares';

import database from './config/database';

const app = express();

const options = {
	customValidators: {
    	isArray: function(value) {
        	return Array.isArray(value);
    	}
 	}
}

const configureExpress = () => {
	app.use(morgan('common'));
	// app.use(express.static(__dirname + '/public'));

	app.use(bodyParser.json());
	app.use(expressValidator(options));

	app.use('/', routes);
	app.use('/', middlewares);

	return app;
}

export default () => database.connect().then(configureExpress);