import express from 'express';
import { PrismaClient } from '@prisma/client';

const commentRoute = express.Router();
const prisma = new PrismaClient();

commentRoute
  .route('/')
  .get(async (req, res) => {
    // cursor 방식의 페이지 네이션 기능
    // :끊김없이 데이터가 나열되는 페이징 기능, 최신 글이 맨 위로 오도록 셋팅
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    res.status(200).send(comments);
  })
  .get(async (req, res) => {
    // 카테고리 별 데이터 조회 작업 필요

    const { category } = req.query;
    console.log(req.query);

    const commentList = await prisma.comment.findMany({
      where: {
        productId: {
          contains: true,
        },
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    if (type) {
      const typeName = String(type) + String('id');
      console.log(typeName);
      const commentsType = commentList.find((comment) => {
        comment.typeName !== null;
      });

      res.status(200).send(commentsType);
    } else {
      res.status(200).send(commentList);
    }
  });

commentRoute
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    res.status(200).send(comment);
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const commentUpdate = await prisma.comment.update({
      where: { id },
      data: req.body,
    });

    res.status(200).send(commentUpdate);
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    await prisma.comment.delete({
      where: { id },
    });

    res.status(204).send({ massage: `delete Comment ${id}` });
  });

export default commentRoute;
