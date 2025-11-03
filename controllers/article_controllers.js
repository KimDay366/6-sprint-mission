import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateArticle, PatchArticle } from '../structs/articleStructs.js';

const prisma = new PrismaClient();

export async function articlesList(req, res) {
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

  const article_list = await prisma.article.findMany({
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

  if (!article_list) {
    throw new Error(`Cannot found data`);
  }

  res.status(200).send(article_list);
}

export async function articleOnly(req, res) {
  const id = req.params.id;
  const article = await prisma.article.findUniqueOrThrow({
    where: { id },
    include: {
      comment: true,
    },
  });

  if (!article) {
    throw new Error(`Cannot found ${id}`);
  }

  res.status(200).send(article);
}

export async function articleNew(req, res) {
  assert(req.body, CreateArticle);
  const article_new = await prisma.article.create({
    data: req.body,
  });

  res.status(201).send(article_new);
}

export async function articleUpdate(req, res) {
  assert(req.body, PatchArticle);
  const id = req.params.id;
  const article_update = await prisma.article.update({
    where: { id },
    data: req.body,
  });

  res.status(200).send(article_update);
}

export async function articleDelete(req, res) {
  const id = req.params.id;
  await prisma.article.delete({
    where: { id },
  });

  res.status(204).send({ massage: `delete Article ${id}` });
}
