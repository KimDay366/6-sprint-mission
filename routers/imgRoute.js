import express from 'express';
import asyncHandler from '../lib/asynchandler.js';
import multer from 'multer';
import { imgNew } from '../controllers/img_controllers.js';

const imgRouter = express.Router();
const upload = multer({ dest: 'files/' });

imgRouter.route('/').post(upload.single('attachment'), asyncHandler(imgNew));

export { imgRouter };
