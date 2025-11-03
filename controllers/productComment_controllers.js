import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateComment, PatchComment } from '../structs/commentStructs.js';

const prisma = new PrismaClient();

export async function productCommentList(req, res) {
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

  if (!productComments) {
    throw new Error(`Cannot found ${id}`);
  }

  const productComment_list = new Array(productComments.comments);
  res.status(200).send(productComment_list);
}

export async function productCommentOnly(req, res) {
  // product 페이지에서 특정 댓글에 접속하는 방식을 구현하고 싶었으나
  // 데이터를 불러오는데 한계가 있어서, 일단 prisma.comment로 작업 하였습니다

  const commentId = req.params.commentId;
  const targetComment = await prisma.comment.findUniqueOrThrow({
    where: { id: commentId },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  if (!targetComment) {
    throw new Error(`Cannot found ${id}`);
  }

  res.status(200).send(targetComment);
}

export async function productCommentNew(req, res) {
  // 1. comment DB에 데이터를 우선 생성

  assert(req.body, CreateComment);
  const commentNew = await prisma.comment.create({
    data: req.body,
  });

  // 2. comment data를 해당하는 product에 연결
  const productId = req.params.productId;
  const commentId = commentNew.id;

  const productComment_new = await prisma.product.update({
    where: { id: productId },
    data: {
      comments: {
        connect: { id: commentId },
      },
    },
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
  res.status(201).send(productComment_new);
}

export async function productCommentUpdate(req, res) {
  assert(req.body, PatchComment);
  const commentId = req.params.commentId;
  const commentUpdate = await prisma.comment.update({
    where: { id: commentId },
    data: req.body,
  });

  res.status(201).send(commentUpdate);
}

export async function productCommentDelete(req, res) {
  const commentId = req.params.commentId;
  await prisma.comment.delete({
    where: { id: commentId },
  });

  res.status(204).send(commentId);
}
