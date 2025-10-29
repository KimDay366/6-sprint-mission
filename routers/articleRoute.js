import express from 'express';
import { PrismaClient } from '@prisma/client';

const articleRoute = express.Router();
const prisma = new PrismaClient();

articleRoute
  .route('/')
  .get(async (req, res) => {
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

    const articleList = await prisma.article.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
      orderBy,
    });

    res.status(200).send(articleList);
  })
  .post(async (req, res) => {
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
    });

    res.status(200).send(articleList);
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const articleUpdate = await prisma.article.update({
      where: { id },
      data: req.body,
    });

    res.status(200).send(articleUpdate);
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    const articleDelete = await prisma.article.delete({
      where: { id },
    });

    res.status(204).send({ massage: `delete Article ${id}` });
  });

export default articleRoute;
