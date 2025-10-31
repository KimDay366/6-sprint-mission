import express from 'express';
import { PrismaClient } from '@prisma/client';

const productRoute = express.Router();
const productCommentRoute = express.Router();
const prisma = new PrismaClient();

productRoute
  .route('/')
  .get(async (req, res) => {
    const {
      offset = 0,
      limit = 10,
      order = 'newest',
      name = '',
      description = '',
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
        orderBy = { createdAt: 'asc' };
    }

    const productList = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
        description: {
          contains: description,
        },
      },
      skip: parseInt(offset),
      take: parseInt(limit),
      orderBy,
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
      },
    });

    res.status(200).send(productList);
  })
  .post(async (req, res) => {
    const productNew = await prisma.product.create({
      data: req.body,
      include: {
        comments: true,
      },
    });

    res.status(201).send(productNew);
  });

productRoute
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    const productOne = await prisma.product.findUnique({
      where: { id },
      include: {
        comments: true,
      },
    });

    res.status(200).send(productOne);
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const productUpdate = await prisma.product.update({
      where: { id },
      data: req.body,
    });

    res.status(200).send(productUpdate);
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    await prisma.product.delete({
      where: { id },
    });

    res.status(204).send({ message: `Product Delete ${id}` });
  });

// ======= product에 연결 된 comment =======

// Product와 comment가 별도의 모델로 구동되므로
// 별도의 작업으로 제작 하였습니다

productCommentRoute
  .route('/:productId/comments')
  .get(async (req, res) => {
    const productId = req.params.productId;
    const productComments = await prisma.product.findUnique({
      where: { id: productId },
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

    const productCommentList = new Array(productComments.comments);
    res.status(200).send(productCommentList);
  })
  .patch(async (req, res) => {
    // 1. comment DB에 데이터를 우선 생성

    const commentNew = await prisma.comment.create({
      data: req.body,
    });

    // 2. comment data를 해당하는 product에 연결
    const productId = req.params.productId;
    const commentId = commentNew.id;

    const productCommentNew = await prisma.product.update({
      where: { id: productId },
      data: {
        comments: {
          connect: { id: commentId },
        },
      },
      include: { comments: true },
    });
    res.status(201).send(productCommentNew);
  });

// product 페이지에서 특정 댓글에 접속하는 방식을 구현하고 싶었으나
// 데이터를 불러오는데 한계가 있어서,
// 일단 prisma.comment로 작업 하였습니다

productCommentRoute
  .route('/:productId/comments/:commentId')
  .get(async (req, res) => {
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
    const commentId = req.params.commentId;
    const data = req.body;
    const commentUpdate = await prisma.comment.update({
      where: { id: commentId },
      data,
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

export { productRoute, productCommentRoute };
