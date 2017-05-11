import setupApp from './src/app';
import mongoose from 'mongoose';

function startApp() {
	const port = process.env.PORT || 3000;

	setupApp()
		.then(app => app.listen(port, () => console.log(`App running at http://localhost:${port}`)))
		.catch(err => {
			console.error(err);
			process.exit(1);
		});
}

export default startApp;