import express from 'express';

import api from './api';
import badRequest from './bad-request';
import notFound from './not-found';

const router = express.Router();

// router.use('/', api);

router.use(badRequest);
router.use(notFound);

export default router;