import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateComment, PatchComment } from '../structs/commentStructs.js';

const prisma = new PrismaClient();

// article 페이지에서 특정 댓글에 접속하는 방식을 구현하고 싶었으나
// 데이터를 불러오는데 한계가 있어서,
// 일단 prisma.comment로 작업 하였습니다

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

  res.status(200).send(articleComments.comments);
}

export async function articleCommentOnly(req, res) {
  // article id 안에서 특정 commendId를 구하고 싶었으나 실패
  // const { articleId, commentId } = req.params;
  // const targetArticle = await prisma.article.findUnique({
  //   where: { id: articleId },
  //   include: {
  //     comments: true,
  //   },
  // });

  // const targetComment = targetArticle.comments.find(
  //   (comment) => comment.id === commentId
  // );

  // res.status(200).send(targetComment);

  const commentId = req.params.commentId;
  const targetComment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  res.status(200).send(targetComment);
}

export async function articleCommentNew(req, res) {
  // 1. comment DB에 데이터를 우선 생성

  assert(req.body, CreateComment);
  const commentNew = await prisma.comment.create({
    data: req.body,
  });

  // 2. comment data를 해당하는 article에 연결
  const articleId = req.params.articleId;
  const commentId = commentNew.id;

  const articleCommentNew = await prisma.article.update({
    where: { id: articleId },
    data: {
      comments: {
        connect: { id: commentId },
      },
    },
    include: { comments: true },
  });
  res.status(201).send(articleCommentNew);
}

export async function articleCommentUpdate(req, res) {
  assert(req.body, PatchComment);
  const commentId = req.params.commentId;
  const commentUpdate = await prisma.comment.update({
    where: { id: commentId },
    data: req.body,
  });

  res.status(201).send(commentUpdate);
}

export async function articleCommentDelete(req, res) {
  const commentId = req.params.commentId;
  await prisma.comment.delete({
    where: { id: commentId },
  });

  res.status(204).send(commentId);
}
