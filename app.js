import express from 'express';
import { PrismaClient } from '@prisma/client';
import productRoute from './routers/productRoute.js';
import articleRoute from './routers/articleRoute.js';

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());

// route 작업
app.use('/products', productRoute);
app.use('/articles', articleRoute);

app.get('/comments', async (req, res) => {
  const comments = await prisma.comment.findMany();

  res.status(200).send(comments);
});

app.get('/comments', async (req, res) => {
  const { offset = 0, limit = 5, order = 'newest' } = req.query;

  let orderBy;

  switch (order) {
    case 'oldest':
      orderBy = { createdAt: 'asc' };
      break;
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
  }
  const commentList = await prisma.comment.findMany({
    skip: parseInt(offset),
    take: parseInt(limit),
    orderBy,
  });

  res.status(200).send(commentList);
});

app.get('/comments/:id', async (req, res) => {
  const id = req.params.id;
  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  res.status(200).send(comment);
});

// app.post('/comments/product', async(req,res)=>{
//   const commentProduct = await prisma.comment.create({
//     data:
//   })
// })

app.listen(port, (req, res) => {
  console.log('start app!!!');
});
