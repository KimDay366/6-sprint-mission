import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function productCommentNew(req, res) {
  // comment를 생성하면서, product id를 연결
  // 솔직히 GPT 도움 많이 아주 많이 받았습니다 ㅠ

  const productId = req.params.productId;
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) return res.status(404).send({ message: 'Product not found' });

  const { content } = req.body;
  const commentCreate = await prisma.commentProduct.create({
    data: {
      content,
      product: {
        connect: { id: productId },
      },
    },
    include: {
      product: true,
    },
  });

  res.status(201).send(commentCreate);
}

export async function oneProductComment(req, res) {
  const id = req.params.productId;
  const productComments = await prisma.product.findUnique({
    where: { id },
    include: {
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
        },
      },
    },
  });

  if (!productComments)
    return res.status(404).send({ message: 'Product not found' });

  res.status(200).send(productComments.comments);
}

export async function productCommentUpdate(req, res) {
  const commentId = req.params.commentId;
  const commentUpdate = await prisma.commentProduct.update({
    where: { id: commentId },
    data: req.body,
  });

  res.status(201).send(commentUpdate);
}

export async function productCommentDelete(req, res) {
  const commentId = req.params.commentId;
  await prisma.commentProduct.delete({
    where: { id: commentId },
  });

  res.status(204).send(commentId);
}
