import express from 'express';
import { PrismaClient } from '@prisma/client';

const productRoute = express.Router();
const prisma = new PrismaClient();

productRoute
  .route('/')
  .get(async (req, res) => {
    const { offset = 0, limit = 10, order = 'newest' } = req.query;

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
      skip: parseInt(offset),
      take: parseInt(limit),
      orderBy,
    });
    res.status(200).send(productList);
  })
  .post(async (req, res) => {
    // 상품 등록과 함께 코멘트가 동시 작성되는건 이상한 구조인거 같아서
    // 작업 테스트만 해 보고 주석처리 합니다
    // const { comment, ...productFields } = req.body;
    // const data = await prisma.product.create({
    //   data: {
    //     ...productFields,
    //     comment: {
    //       create: comment,
    //     },
    //   },
    //   include: {
    //     comment: true,
    //   },
    // });

    const productNew = await prisma.product.create({
      data: req.body,
    });

    res.status(201).send(productNew);
  });

productRoute
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    const productOne = await prisma.product.findUnique({
      where: { id },
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

export default productRoute;
