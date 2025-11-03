import express from 'express';
import asyncHandler from '../lib/asynchandler.js';
import * as c from '../controllers/comment_controllers.js';

const commentRoute = express.Router();

const coment = commentRoute.route('/');
const coment_id = commentRoute.route('/:id');

coment.get(asyncHandler(c.commentsList));

coment_id.get(asyncHandler(c.commentOnly));
coment_id.patch(asyncHandler(c.commentUpdate));
coment_id.delete(asyncHandler(c.commentDelete));

export default commentRoute;
