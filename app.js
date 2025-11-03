import express from 'express';
import { productRoute, productCommentRoute } from './routers/productRoute.js';
import { articleRoute, articleCommentRoute } from './routers/articleRoute.js';
import { commentRoute } from './routers/commentRoute.js';
import { imgRouter } from './routers/imgRoute.js';

import cors from 'cors';
import errorHandler from './lib/errorhandler.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// route 작업
app.use('/products', productRoute);
app.use('/products', productCommentRoute);

app.use('/articles', articleRoute);
app.use('/articles', articleCommentRoute);

app.use('/comments', commentRoute);

app.use('/files', imgRouter);
app.use('/files', express.static('files'));

app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log('start app!!!');
});
