import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function articleCommentNew(req, res) {
  const articleId = req.params.articleId;
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) return res.status(404).send({ message: 'Article not found' });

  const { content } = req.body;
  const commentCreate = await prisma.commentArticle.create({
    data: {
      content,
      article: {
        connect: { id: articleId },
      },
    },
    include: {
      article: true,
    },
  });

  res.status(201).send(commentCreate);
}

export async function articleCommentsList(req, res) {
  const articleId = req.params.articleId;
  const articleComments = await prisma.article.findUnique({
    where: { id: articleId },
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

  if (!articleComments)
    return res.status(404).send({ message: 'Product not found' });

  res.status(200).send(articleComments.comments);
}

export async function articleCommentUpdate(req, res) {
  const commentId = req.params.commentId;
  const commentUpdate = await prisma.commentArticle.update({
    where: { id: commentId },
    data: req.body,
  });

  res.status(201).send(commentUpdate);
}

export async function articleCommentDelete(req, res) {
  const commentId = req.params.commentId;
  await prisma.commentArticle.delete({
    where: { id: commentId },
  });

  res.status(204).send(commentId);
}
