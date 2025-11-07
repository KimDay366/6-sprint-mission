import express from 'express';
import asyncHandler from '../lib/asynchandler.js';
import * as p from '../controllers/product_controllers.js';
import * as pc from '../controllers/productComment_controllers.js';

import {
  productCreateValidation,
  productUpdateValidation,
} from '../lib/product_validation.js';

import {
  commentCreateValidation,
  commentUpdateValidation,
} from '../lib/comment_validation.js';

const productRoute = express.Router();
const productCommentRoute = express.Router();

const product = productRoute.route('/');
const product_id = productRoute.route('/:id');

product.get(asyncHandler(p.productsList));
product.post(productCreateValidation, asyncHandler(p.productNew));

product_id.get(asyncHandler(p.productOnly));
product_id.patch(productUpdateValidation, asyncHandler(p.productUpdate));
product_id.delete(asyncHandler(p.productDelete));

// ======= product에 연결 된 comment =======
// Product와 comment가 별도의 모델로 구동되므로
// 별도의 작업으로 제작 하였습니다

const productComment = productRoute.route('/:productId/productcomments');
const productComment_id = productRoute.route(
  '/:productId/productcomments/:commentId'
);

productComment.get(asyncHandler(pc.oneProductComment));
productComment.post(
  commentCreateValidation,
  asyncHandler(pc.productCommentNew)
);

productComment_id.patch(
  commentUpdateValidation,
  asyncHandler(pc.productCommentUpdate)
);
productComment_id.delete(asyncHandler(pc.productCommentDelete));

export { productRoute, productCommentRoute };
