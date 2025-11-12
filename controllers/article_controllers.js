import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function articleNew(req, res) {
  try {
    const articleCreate = await prisma.article.create({
      data: req.body,
    });

    res.status(201).send(articleCreate);
  } catch (err) {
    next(err);
  }
}

export async function articlesList(req, res) {
  try {
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

    const articles = await prisma.article.findMany({
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

    if (!articles) {
      throw new Error(`Cannot found data`);
    }

    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
}

export async function articleOnly(req, res) {
  try {
    const id = req.params.id;
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    if (!article) {
      throw new Error(`Cannot found ${id}`);
    }

    res.status(200).send(article);
  } catch (err) {
    next(err);
  }
}

export async function articleUpdate(req, res) {
  try {
    const id = req.params.id;
    const articleUpdate = await prisma.article.update({
      where: { id },
      data: req.body,
    });

    res.status(200).send(articleUpdate);
  } catch (err) {
    next(err);
  }
}

export async function articleDelete(req, res) {
  try {
    const id = req.params.id;
    await prisma.article.delete({
      where: { id },
    });

    res.status(204).send({ massage: `delete Article ${id}` });
  } catch (err) {
    next(err);
  }
}
