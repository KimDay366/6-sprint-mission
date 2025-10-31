import express from 'express';
import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateArticle, PatchArticle } from '../structs/articleStructs.js';
import { CreateComment, PatchComment } from '../structs/commentStructs.js';

const articleRoute = express.Router();
const articleCommentRoute = express.Router();
const prisma = new PrismaClient();

articleRoute
  .route('/')
  .get(async (req, res) => {
    const {
      offset = 0,
      limit = 5,
      order = 'newest',
      title = '',
      content = '',
    } = req.query;

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

    const articleList = await prisma.article.findMany({
      where: {
        title: {
          contains: title,
        },
        content: {
          contains: content,
        },
      },
      skip: parseInt(offset),
      take: parseInt(limit),
      orderBy,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    res.status(200).send(articleList);
  })
  .post(async (req, res) => {
    assert(req.body, CreateArticle);
    const articleNew = await prisma.article.create({
      data: req.body,
    });

    res.status(201).send(articleNew);
  });

articleRoute
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    const articleList = await prisma.article.findUnique({
      where: { id },
      include: {
        comment: true,
      },
    });

    res.status(200).send(articleList);
  })
  .patch(async (req, res) => {
    assert(req.body, PatchArticle);
    const id = req.params.id;
    const articleUpdate = await prisma.article.update({
      where: { id },
      data: req.body,
    });

    res.status(200).send(articleUpdate);
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    await prisma.article.delete({
      where: { id },
    });

    res.status(204).send({ massage: `delete Article ${id}` });
  });

// ======= article에 연결 된 comment =======

// article와 comment가 별도의 모델로 구동되므로
// 별도의 작업으로 제작 하였습니다

articleCommentRoute
  .route('/:articleId/comments')
  .get(async (req, res) => {
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
  })
  .post(async (req, res) => {
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
  });

// article 페이지에서 특정 댓글에 접속하는 방식을 구현하고 싶었으나
// 데이터를 불러오는데 한계가 있어서,
// 일단 prisma.comment로 작업 하였습니다

articleCommentRoute
  .route('/:articleId/comments/:commentId')
  .get(async (req, res) => {
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
  })
  .patch(async (req, res) => {
    assert(req.body, PatchComment);
    const commentId = req.params.commentId;
    const commentUpdate = await prisma.comment.update({
      where: { id: commentId },
      data: req.body,
    });

    res.status(201).send(commentUpdate);
  })
  .delete(async (req, res) => {
    const commentId = req.params.commentId;
    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(204).send(commentId);
  });

export { articleRoute, articleCommentRoute };
