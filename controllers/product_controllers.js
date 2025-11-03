import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateProduct, PatchProduct } from '../structs/productStructs.js';

const prisma = new PrismaClient();

export async function productsList(req, res) {
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
}

export async function productOnly(req, res) {
  const id = req.params.id;
  const product = await prisma.product.findUniqueOrThrow({
    where: { id },
    include: {
      comments: true,
    },
  });

  if (!product) {
    throw new Error(`Cannot found ${id}`);
  }

  res.status(200).send(product);
}

export async function productNew(req, res) {
  assert(req.body, CreateProduct);
  const product_new = await prisma.product.create({
    data: req.body,
    include: {
      comments: true,
    },
  });

  res.status(201).send(product_new);
}

export async function productUpdate(req, res) {
  assert(req.body, PatchProduct);
  const id = req.params.id;
  const product_update = await prisma.product.update({
    where: { id },
    data: req.body,
  });

  res.status(200).send(product_update);
}

export async function productDelete(req, res) {
  const id = req.params.id;
  await prisma.product.delete({
    where: { id },
  });

  res.status(204).send({ message: `Product Delete ${id}` });
}
