import express from 'express';
import asyncHandler from '../lib/asynchandler.js';
import * as a from '../controllers/article_controllers.js';
import * as ac from '../controllers/articleComment_controllers.js';

const articleRoute = express.Router();
const articleCommentRoute = express.Router();

const article = articleRoute.route('/');
const article_id = articleRoute.route('/:id');

article.get(asyncHandler(a.articlesList));
article.post(asyncHandler(a.articleNew));

article_id.get(asyncHandler(a.articleOnly));
article_id.patch(asyncHandler(a.articleUpdate));
article_id.delete(asyncHandler(a.articleDelete));

// ======= article에 연결 된 comment =======
// article와 comment가 별도의 모델로 구동되므로
// 별도의 작업으로 제작 하였습니다

const articleComment = articleRoute.route('/:articleId/comments');
const articleComment_id = articleRoute.route('/:articleId/comments/:commentId');

articleComment.get(asyncHandler(ac.articleCommentsList));
articleComment.post(asyncHandler(ac.articleCommentNew));

articleComment_id.get(asyncHandler(ac.articleCommentOnly));
articleComment_id.patch(asyncHandler(ac.articleCommentUpdate));
articleComment_id.delete(asyncHandler(ac.articleCommentDelete));

export { articleRoute, articleCommentRoute };
