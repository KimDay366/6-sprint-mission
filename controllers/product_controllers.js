import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function productNew(req, res) {
  try {
    const productCreate = await prisma.product.create({
      data: req.body,
      include: {
        comments: true,
      },
    });

    res.status(201).send(productCreate);
  } catch (err) {
    next(err);
  }
}

export async function productsList(req, res) {
  try {
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

    const product_list = await prisma.product.findMany({
      where: {
        name: { contains: name },
        description: { contains: description },
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

    if (!product_list) {
      throw new Error(`Cannot found ${id}`);
    }

    res.status(200).send(product_list);
  } catch (err) {
    next(err);
  }
}

export async function productOnly(req, res) {
  try {
    const id = req.params.id;
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        createdAt: true,
      },
    });

    if (!product) {
      throw new Error(`Cannot found ${id}`);
    }

    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
}

export async function productUpdate(req, res) {
  try {
    const id = req.params.id;
    const productUpdate = await prisma.product.update({
      where: { id },
      data: req.body,
    });

    res.status(200).send(productUpdate);
  } catch (err) {
    next(err);
  }
}

export async function productDelete(req, res) {
  try {
    const id = req.params.id;
    await prisma.product.delete({
      where: { id },
    });

    res.status(204).send({ message: `Product Delete ${id}` });
  } catch (err) {
    next(err);
  }
}
